import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DynamicInput from "../Components/DynamicInput";
import { BiLoaderCircle } from "react-icons/bi";
import { gettingStarted, login } from "../Services/httpRequests";

function Auth({ isSignUp, setIsSignUp }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Error States
  const [nameErrorText, setNameErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  // Name Validation
  const nameValidator = (name) => {
    if (name == "") {
      setNameErrorText("Name is required");
      return false;
    }
    setNameErrorText("");
    return true;
  };

  // Email Validation
  const emailValidator = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email == "") {
      setEmailErrorText("Email is required");
      return false;
    }
    if (!re.test(email) && isSignUp) {
      setEmailErrorText("Enter valid email");
      return false;
    }
    setEmailErrorText("");
    return true;
  };

  // Password Validation
  const passwordValidator = (password) => {
    if (password === "") {
      setPasswordErrorText("Password is required");
      return false;
    }
    if (password.length < 8 && isSignUp) {
      setPasswordErrorText("Password should not be less than 8 characters");
      return false;
    }
    if (password.search(/\d+/g) < 0 && isSignUp) {
      setPasswordErrorText("Password must contain atleast one Number");
      return false;
    }
    if (password.search(/[A-Z]/) < 0 && isSignUp) {
      setPasswordErrorText(
        "Password must contain atleast one Uppercase character"
      );
      return false;
    }
    setPasswordErrorText("");
    return true;
  };

  const handleSubmit = async () => {
    let v0 = nameValidator(name);
    let v1 = emailValidator(email);
    let v2 = passwordValidator(password);

    if (!v0 || !v1 || !v2) return;

    // for SignUp API Integration
    if (isSignUp) {
      setLoading(true);
      gettingStarted({ name, email, password })
        .then((res) => {
          setLoading(false);
          // console.log(res.data);
          sessionStorage.setItem("session", res.data.sessionUser.email);
          navigate("/dashboard");
        })
        .catch((err) => {
          setLoading(false);
          setPasswordErrorText(err.response.data.message);
        });
    }
    // for Login API Integration
    else {
      setLoading(true);
      login({ email, password })
        .then((res) => {
          setLoading(false);
          // console.log(res.data);
          sessionStorage.setItem("session", res.data.sessionUser.email);
          navigate("/dashboard");
        })
        .catch((err) => {
          setLoading(false);
          setPasswordErrorText(err.response.data.message);
        });
    }
  };
  return (
    <div className="root_auth_container">
      <div className="root_auth_left_conatiner">
        <h1 className="root_auth_heading">
          {isSignUp ? "Getting Started" : "Login"}
        </h1>
        {isSignUp && (
          <DynamicInput
            placeholder="Enter Name"
            type="text"
            value={name}
            setValue={setName}
            errorText={nameErrorText}
          />
        )}
        <DynamicInput
          placeholder="Enter Email"
          type="text"
          value={email}
          setValue={setEmail}
          errorText={emailErrorText}
        />
        <DynamicInput
          placeholder="Enter Password"
          type="password"
          value={password}
          setValue={setPassword}
          errorText={passwordErrorText}
        />

        <button className="root_auth_button" onClick={handleSubmit}>
          {isSignUp ? "Sign up" : "Login"}
        </button>
        <Link
          to={isSignUp ? "/signin" : "/"}
          style={{
            cursor: "pointer",
            alignSelf: "center",
            marginTop: "10px",
            color: "black",
            textDecoration: "none",
          }}
        >
          {isSignUp ? "Have an Account ?" : "Create an Account"}
          <span className="root_span_contianer">
            {"  "}
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </Link>
      </div>
      {loading && (
        <div className="loader">
          <BiLoaderCircle size={100} />
        </div>
      )}
    </div>
  );
}

export default Auth;
