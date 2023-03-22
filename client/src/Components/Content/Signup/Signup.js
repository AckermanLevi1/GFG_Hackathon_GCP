import React, { useState, useContext } from "react";
import FileBase from "react-file-base64";

import { Navigate, Link } from "react-router-dom";
import { createUser } from "../../api/createUser";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthorizationContext.js";
import "./Signup.css";

function Signup() {
  const [profession, setProfession] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({});
  const useAuth = useContext(AuthContext);

  const handleEntryChanges = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handelSignUp = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      form.password === confirmPassword
        ? await useAuth.Signup(form.email, form.password).then((result) => {
            createUser(form);
            setIsLoading(false);
          })
        : alert("Password and confirm password does not matched");
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  if (useAuth.currentUser) {
    return (
      <div className="container">
        <Navigate to={"/userProfile"} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>SignUp as {profession}</h1>
      {!profession && (
        <>
          <div>Select ur User Profile</div>
          <button value="Farmer" onClick={(e) => setProfession(e.target.value)}>
            Farmer
          </button>
          <button value="Buyer" onClick={(e) => setProfession(e.target.value)}>
            Buyer
          </button>
          <button
            value="  Big Company"
            onClick={(e) => {
              setProfession(e.target.value);
            }}>
            Big Company
          </button>
        </>
      )}
      {profession.length !== 0 && (
        <form onSubmit={handelSignUp}>
          <label>
            Email:
            <input
              name="email"
              required
              type="email"
              value={form.email}
              onChange={(e) => handleEntryChanges(e)}
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              required
              type="password"
              value={form.password}
              onChange={(e) => handleEntryChanges(e)}
            />
          </label>
          <label>
            Confirm Password:
            <input
              name="confirmPassword"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </label>
          <label>
            Name:
            <input
              name="userName"
              required
              type="text"
              value={form.userName}
              onChange={(e) => handleEntryChanges(e)}
            />
          </label>
          <label>
            Account No:
            <input
              name="accountNo"
              type="number"
              required
              value={form.accountNo}
              minLength={12}
              maxLength={12}
              onChange={(e) => handleEntryChanges(e)}
            />
          </label>
          <label>
            Mobile No*:
            <input
              name="Mnumber"
              required
              type="number"
              value={form.Mnumber}
              minLength="12"
              onChange={(e) => handleEntryChanges(e)}
            />
          </label>

          <label>
            Address :
            <input
              name="address"
              required
              type="text"
              value={form.address}
              minLength="12"
              onChange={(e) => handleEntryChanges(e)}
            />
          </label>
          <fieldset>
            <legend>Select a Gender:</legend>
            <label>
              {" "}
              Male:{" "}
              <input
                type="radio"
                onFocus={(e) => {
                  setForm({ ...form, gender: e.target.value });
                }}
                name="gender"
                value="Male"
              />
            </label>

            <label>
              Female:{" "}
              <input
                onFocus={(e) => {
                  setForm({ ...form, gender: e.target.value });
                }}
                type="radio"
                name="gender"
                value="Female"
              />
            </label>
          </fieldset>
          <FileBase
            type="image"
            multiple={false}
            onDone={({ base64 }) => setForm({ ...form, ip: base64 })}
          />
          <button disabled={isLoading} type="submit">
            {!isLoading ? "Login" : <CircularProgress />}
          </button>
        </form>
      )}
      <div>
        Already a user - <Link to="/signin">SignIn</Link>
      </div>
    </div>
  );
}

export default Signup;
