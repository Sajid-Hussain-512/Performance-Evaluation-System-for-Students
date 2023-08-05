import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

import institute from "../images/institute.png";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  let role;
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your login logic here
    try {
      console.log("Submitted!", username, password);
      const body = { uname: username, pass: password };
      console.log(JSON.stringify(body));
      const response = await fetch("http://localhost:8081/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // console.log(response);
      const responseJson = await response.json();
      role = responseJson.role;

      if (role === 0) {
        navigate("/AdminLogin");
      } else if (role === 1) {
        navigate("/TeacherLogin");
      } else if (role === 2) {
        navigate("/StudentLogin");
      } else {
        alert("Error: Invalid Username or Password!!!");
      }

    } catch (error) {
      alert("Connection Error!!!!");
      // console.error(error);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="header">
          <img src={institute} alt="Institute" />
          <h1>PESS</h1>
        </div>

        <form method="post" onSubmit={handleSubmit} className="form">
          <label htmlFor="username">Username:</label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type={passwordVisible ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {!passwordVisible ? (
            <i
              className="bi bi-eye-slash"
              id="togglePassword"
              onClick={handlePasswordVisibility}
            ></i>
          ) : (
            <i
              className="bi bi-eye"
              id="togglePassword"
              onClick={handlePasswordVisibility}
            ></i>
          )}

          <button
            type="submit"
            id="submit"
            className="submit"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </form>
      </div>
      {/* <AdminLogin />; */}
    </div>
  );
}

export default LoginForm;
