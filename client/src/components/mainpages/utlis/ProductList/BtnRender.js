import React, { useContext } from "react";
import { Globalstate } from "../../../../Globalstate";
import { Link } from "react-router-dom";
export default function BtnRender({ product }) {
  const state = useContext(Globalstate);
  const [isAdmin] = state.UserAPI.isAdmin;
  const addCart = state.UserAPI.addCart;
  return (
    <div className="row-btn">
      {isAdmin ? (
        <>
          <Link id="btn_buy" to={`#!`}>
            Delete
          </Link>
          <Link id="btn_view" to={`detail/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to={`#!`} onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link id="btn_view" to={`detail/${product._id}`}>
            view
          </Link>
        </>
      )}
    </div>
  );
}
