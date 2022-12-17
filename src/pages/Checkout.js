import React from "react";
import { useCookies } from "react-cookie";
import Checkoutitem from "../component/Checkoutitem";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
const Checkout = () => {
  const [cookies, setCookie] = useCookies(["name"]);

  return (
    <div className="carttt">
      <Navbar type="off" />
      <div className="cartorder">
        <div className="right">
          <div className="Deliverinfo">
            <h1 className="warnning">
              !Give Correct Address Otherwise you don't get your product.
            </h1>
            <span className="Delivery">Deliver to: {cookies.Name}</span>
            <span className="phone">Phone: {cookies.Phone}</span>
            <span className="email">Email: {cookies.Email}</span>
            <span className="address">
              Address to Deliver:{" "}
              <input type="text" placeholder="Enter address." />
            </span>
          </div>

          <div className="Down">
            <Checkoutitem />
            <Checkoutitem />
            <Checkoutitem />
            <Checkoutitem />
          </div>
        </div>
        <div className="left">
          <h4>Order summery</h4>
          <div className="subtotal">
            <h5>subtotal(1 items)</h5>
            <h5>Rs.4000</h5>
          </div>
          <div className="subtotal">
            <h5>Delivery Fee</h5>
            <h5>Rs.50</h5>
          </div>
          <div className="subtotal">
            <h5>Total payment</h5>
            <h5>Rs.4050</h5>
          </div>
          <div className="subtotal">
            <h5>Total</h5>
            <h5>Rs.4050</h5>
          </div>
          <small className="sm">All taxes included</small>
          <button>place order</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
