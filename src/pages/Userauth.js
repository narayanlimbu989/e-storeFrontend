import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Userauth = () => {
  const nav = useNavigate();
  const [cookies, setCookie] = useCookies(["name"]);
  const [register, setregister] = useState(false);
  const [inputs, setinputs] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const handleinputs = (e) => {
    setinputs((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };
  const handlepostinputs = async (e) => {
    e.preventDefault();
    const { name, password, phone } = inputs;
    try {
      const response = await axios
        .post(`http://localhost:8000/user/${register ? "register" : "login"}`, {
          name,
          phone,
          email: inputs.email.toLowerCase(),
          password
        })
        .catch((err) => console.log(err));
      const success = response.status === 201;
      const successlogin = response.status === 202;

      if (success) {
        alert("Register successfully. please login!");
        setregister(false);
      } else if (successlogin) {
        alert("successfilly login!");
        nav("/");
        setCookie("Email", response.data.email);
        setCookie("Name", response.data.name);
        setCookie("Phone", response.data.phone);
        setCookie("Token", response.data.accesstoken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="userauth">
      <div className="auth">
        {register ? <h1>create account</h1> : <h1>login</h1>}

        <div className="inputfield">
          {register && (
            <>
              <label htmlFor="name">Fullname</label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputs.name}
                onChange={handleinputs}
              />
              <label htmlFor="phone">phone</label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={inputs.phone}
                onChange={handleinputs}
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleinputs}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleinputs}
          />
          <button onClick={handlepostinputs}>continue</button>
          {register ? (
            <span>
              Already have an account?{" "}
              <span className="signup" onClick={() => setregister(false)}>
                sign in
              </span>
            </span>
          ) : (
            <span>
              Create your own account?{" "}
              <span className="signup" onClick={() => setregister(true)}>
                sign up
              </span>
            </span>
          )}
        </div>
        <button style={{ cursor: "pointer" }} onClick={() => nav("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Userauth;
