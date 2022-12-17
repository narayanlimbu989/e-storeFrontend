import React from "react";
import product from "./image/key2.webp";
const Checkoutitem = () => {
  return (
    <div className="checkoutlist">
      <div className="picture">
        <img src={product} alt="img" />
      </div>
      <h4>keyboard</h4>
      <h4>Qty: 1</h4>
      <h4>Rs 2000</h4>
    </div>
  );
};

export default Checkoutitem;
