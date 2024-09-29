import React, { useContext } from "react";
import { Globalstate } from "../../../Globalstate";
import { Link } from "react-router-dom";

export default function Cart() {
  const state = useContext(Globalstate);
  const [cart] = state.UserAPI.cart;
  console.log(cart);

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );
  }

  return (
    <div>
      {cart.map((product) => (
        <div className="detail">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg15omZwr1TxPQoEw9BOCSOJAs3b0thWlmNw&s" />
          <div className="box-detail">
            <div className="row">
              <h2>{product.title}</h2>
              <h2>{product.product_id}</h2>
            </div>
            <span>${product.price}</span>
            <p>{product.description}</p>

            <Link to="/cart" className="cart">
              Buy
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
