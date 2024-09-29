import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductAPI() {
  const [product, setProduct] = useState([]);

  // Fetch products from the API and update the state
  const getProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      // console.log(res); // Log the data to verify the structure

      // Update the state with the fetched products
      setProduct(res.data); // Ensure this matches the data structure
    } catch (error) {
      console.error("Failed to fetch products:", error); // Error handling
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [product, setProduct],
  };
}
