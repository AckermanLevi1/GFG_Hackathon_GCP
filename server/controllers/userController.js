const db = require("../config/firebase");

module.exports.create = async function (req, res) {
  var data = req.body.postData;
  var latlng = [];
  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.address}.json?access_token=pk.eyJ1IjoibWFwLWJvaTY5IiwiYSI6ImNsYzF5OWhiNTNxZzEzcGtlZ2g4OTAxM3MifQ.CqZQLqoP6bO5UkLZoTzQhQ`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      data = { ...data, latlng: res.features[0].center };

      db.collection("users").add(data);
      res.json({
        message: "success",
      });
    })

    .catch((error) => {
      console.log(error.message);
    });
};

module.exports.getUser = async function (req, res) {
  try {
    const data = req.body.postData;
    // console.log(data);
    const snapsh = db.collection("users");
    var ref = await snapsh.where("email", "==", `${data.email}`).get();
    var list = [];
    ref.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });

    res.json({
      message: "success",
      list,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.updateUser = async function (req, res) {
  try {
    const data = req.body.postData;

    const docref = db.collection("users").doc(data._id);
    await docref.update({ data });

    res.json({
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUserProducts = async function (req, res) {
  try {
    const email = req.body.email;
    const userCollection = db.collection("users");
    const userData = await userCollection.where("email", "==", email).get();
    var id;
    userData.forEach((doc) => {
      id = doc.id;
    });
    const collection = db.collection("products");
    const data = await collection.where("userId", "==", id).get();
    var list = [];
    data.forEach((doc) => {
      list.push({
        _id: doc.id,
        descricption: doc.data().descricption,
        ip: doc.data().ip,
        name: ` ${doc.data().product} ${doc.data().species}`,
        maxQuantity: doc.data().maxQuantity,
        minQuantity: doc.data().minQuantity,
        price: doc.data().price,
        quantity: doc.data().quantity,
      });
    });
    return res.json({
      message: "success",
      data: list,
    });
  } catch (error) {
    console.log(error);
  }
} 

module.exports.getUserRent = async function (req, res) {
  try {
    const email = req.body.email;
    //search in rent collection for user email equal to email and get the whole data
    const collection = db.collection("rent");
    const data = await collection.where("email", "==", email).get();
    var list = [];
    data.forEach((doc) => {
      list.push({
        _id: doc.id,
        address: doc.data().Address,
        area: doc.data().area,
        date: doc.data().date,
        duration: doc.data().duration,
        email: doc.data().email,
        ip:doc.data().ip,
        name: doc.data().name,
        price: doc.data().price,
        service: doc.data().service,
        staus: doc.data().staus,
        service_provider_email: doc.data().service_provider_email,

      });
    });
    // console.log(req.body);
    

    return res.json({
      message: "success",
      data: list,
    });
  } catch (error) {
    console.log(error);
  }
}