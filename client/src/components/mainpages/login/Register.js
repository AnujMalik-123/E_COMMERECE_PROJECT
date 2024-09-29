import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registersubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstregister", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="register-page">
      <form onSubmit={registersubmit}>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter Name"
          value={user.name}
          onChange={changeInput}
        />

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
          <button type="submit">Register</button>
          <Link to="/Login">Login</Link>
        </div>
      </form>
    </div>
  );
}
