import React from "react";
import { Link } from "react-router-dom";
import BtnRender from "./BtnRender";
export default function ProductList({ product, isAdmin }) {
  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg15omZwr1TxPQoEw9BOCSOJAs3b0thWlmNw&s"
        alt=""
      />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender product={product} />
    </div>
  );
}
