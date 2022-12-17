import React, { useEffect } from "react";
import { setproduct } from "../redux/actions/productactions";
import Footer from "../component/Footer";
import axios from "axios";
import Navbar from "../component/Navbar";
import Homeproduct from "../component/Homeproduct";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const productlist = useSelector((state) => state.Allproduct.products);
  const dispatch = useDispatch();

  const callproductlist = async (req, res) => {
    const response = await axios
      .get("http://localhost:8000/product/list")
      .catch((err) => console.log(err));
    dispatch(setproduct(response.data));
  };

  useEffect(() => {
    callproductlist();
  }, []);
  return (
    <div>
      <Navbar/>
      <Homeproduct productlist={productlist} />
      <Footer />
    </div>
  );
};

export default Home;
