const db = require("../config/firebase");

module.exports.add = async function (req, res) {
  try {
    //get user from email
    const email = await req.body.email;
    const snapsh = db.collection("users");
    var ref = await snapsh.where("email", "==", `${email}`).get();
    var temp = ref.docs[0];
    var array = await temp?.data()?.cartArray;
    if(!array){
      array = [];
    }
    if(array.find((item) => item.id === req.body.id)){
      return res.status(200).json({
        message: "already added",
      });
    }

    array.push(req.body);
    await db.collection("users").doc(temp.id).update({
      cartArray: array,
    });
    // console.log(array);
    res.status(200).json({
      message: "success",
    });
    
  } catch (error) {
    console.log(error);
  }
};

module.exports.getCart = async function (req, res) {
  try {
    const email = await req.body.email;
    // console.log(req.body);
    const snapsh = db.collection("users");
    var ref = await snapsh.where("email", "==", `${email}`).get();

    var temp = ref.docs[0];
    var array = await temp?.data()?.cartArray;
    if(!array){
      array = [];
    }
    // console.log(array);
    res.status(200).json({
      message: "success",
      cart: array,
    });

  } catch (error) {
    console.log(error);
  }
};

module.exports.updateUserCartItem = async function (req, res) {
  try {
    const data = req.body.postData;
    await db
      .collection("users")
      .doc(data.id)
      .update({ cartArray: data.cartArray });

    res.json({
      message: "cart updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
