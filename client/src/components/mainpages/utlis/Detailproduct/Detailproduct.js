import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Globalstate } from "../../../../Globalstate";
import { Link } from "react-router-dom";
export default function Detailproduct() {
  const params = useParams();
  const state = useContext(Globalstate);
  const [products] = state.ProductAPI.products;
  const [detailproduct, setDetailproduct] = useState([]);
  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailproduct(product);
        }
      });
    }
  }, [params, products]);
  console.log(detailproduct);
  return (
    <div className="detail">
      <img src="https://www.honda2wheelersindia.com/assets/images/products/Motorcycle/unicorn_sitemap_product_img_dev_one.jpg" />
      <div className="box-detail">
        <div className="row">
          <h2>{detailproduct.title}</h2>
          <h2>{detailproduct.product_id}</h2>
        </div>
        <span>${detailproduct.price}</span>
        <p>{detailproduct.description}</p>

        <Link to="/cart" className="cart">
          Buy
        </Link>
      </div>
    </div>
  );
}
