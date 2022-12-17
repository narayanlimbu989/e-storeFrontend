import React from "react";
import {AiOutlineFacebook,AiOutlineInstagram,AiOutlineTwitter} from "react-icons/ai"
import {BsWhatsapp} from "react-icons/bs"
import img1 from "./image/sewa.png";
import img2 from "./image/khalti.png";
import img3 from "./image/ime.png";
import img4 from "./image/bank.png";


const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="payment">
          <h1>Payment Method</h1>
          <div className="cash">cash on Delivery</div>
          <div className="online">
            <img src={img1} alt="sewa" />
          </div>
          <div className="online">
            <img src={img2} alt="sewa" />
          </div>
          <div className="online">
            <img src={img3} alt="sewa" />
          </div>
          <div className="online">
            <img src={img4} alt="sewa" />
          </div>
        </div>
        <div className="followus">
          <h1>Follow us</h1>
          <div className="facebook">
            <AiOutlineFacebook className="uslogo" style={{color:"blue"}}/>facebook
          </div>
          <div className="facebook">
          <AiOutlineInstagram className="uslogo" style={{color:"red"}}/>instagrem
          </div>
          <div className="facebook">
          <AiOutlineTwitter className="uslogo" style={{color:"lightblue"}}/>Twitter
          </div>
          <div className="facebook">
          <BsWhatsapp className="uslogo" style={{color:"lightgreen"}}/>Whatsapp
          </div>
        </div>
      </div>
      <div className="down">©️ e.Store.com 2022</div>
    </div>
  );
};

export default Footer;
