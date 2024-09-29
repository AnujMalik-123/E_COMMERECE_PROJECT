import React, { useContext } from "react";
import {
  MdOutlineMenu,
  MdClose,
  MdOutlineAddShoppingCart,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./header.css";
import { Globalstate } from "../../Globalstate";
import axios from "axios";

export default function Header() {
  const state = useContext(Globalstate);
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
  const [cart] = state.UserAPI.cart;

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };

  const AdminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const LoggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <MdOutlineMenu style={{ width: 30, height: 30 }} />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "ANUJ SHOP"}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "ANUJ SHOP"}</Link>
        </li>
        {isAdmin && <AdminRouter />}
        {isLogged ? (
          <LoggedRouter />
        ) : (
          <li>
            <Link to="/login">Login Or Register</Link>
          </li>
        )}
        <li>
          <MdClose style={{ width: 30 }} className="menu" />
        </li>
      </ul>
      {!isAdmin && (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <MdOutlineAddShoppingCart style={{ width: 30 }} />
          </Link>
        </div>
      )}
    </header>
  );
}
