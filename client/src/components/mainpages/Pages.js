import React from "react";
import Product from "./products/Product";
import Login from "./login/Login";
import Register from "./login/Register";
import Cart from "./cart/Cart.js";
import { Route, Routes } from "react-router-dom";
import Detailproduct from "./utlis/Detailproduct/Detailproduct.js";

export default function Pages() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:id" element={<Detailproduct />} />
      </Routes>
    </div>
  );
}
