import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const changeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginsubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstlogin", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={loginsubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={changeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Enter password"
          value={user.password}
          onChange={changeInput}
        />
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
