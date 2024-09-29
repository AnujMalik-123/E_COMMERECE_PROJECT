import React, { useContext } from "react";
import { Globalstate } from "../../../Globalstate";
import ProductList from "../utlis/ProductList/ProductList";
export default function Product() {
  const state = useContext(Globalstate);
  // console.log(state);
  const [products] = state.ProductAPI.products;
  const [isAdmin] = state.UserAPI.isAdmin;
  // console.log(products);
  return (
    <div className="product">
      {products.map((product) => {
        return (
          <ProductList key={product._id} product={product} isAdmin={isAdmin} />
        );
      })}
    </div>
  );
}
