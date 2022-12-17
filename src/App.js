import React from "react";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Securesite from "./pages/Securesite";
import Searchedproduct from "./pages/searchedproduct";
import Userauth from "./pages/Userauth";
import { Route, Routes } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<Product />} />
        <Route
          path="/cart"
          element={
            <Securesite>
              {" "}
              <Cart />{" "}
            </Securesite>
          }
        />
        <Route
          path="/checkout"
          element={
            <Securesite>
              {" "}
              <Checkout />{" "}
            </Securesite>
          }
        />
        <Route path="/searched_by_category" element={<Searchedproduct />} />
        <Route path="/Userauthentication" element={<Userauth />} />
      </Routes>
    </div>
  );
};

export default App;
