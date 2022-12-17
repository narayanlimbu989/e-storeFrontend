import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import img from "./image/Amazon.jpg";
const Homeproduct = ({ productlist }) => {
  const nav = useNavigate();
  const handleid = (id) => {
    nav(`/product/${id}`);
  };
  return (
    <div className="Homeproduct">
      <div className="imgoffer">
        <img src={img} alt="" />
      </div>
      <div className="incdrc_section">
        <div className="dec">
          <IoIosArrowBack />
        </div>
        <div className="inc">
          <IoIosArrowForward />
        </div>
      </div>

      <div className="foryou">
        <div className="down">
          {productlist.length > 0 ? (
            productlist.map((item) => {
              const { _id, Pimage, title, price, discount, rating } = item;

              return (
                <div
                  className="product"
                  key={_id}
                  onClick={() => handleid(_id)}
                >
                  <img src={Pimage.secure_url} alt="img" />
                  <h2 className="name">{title}</h2>
                  <h1 className="price">Rs.{price}</h1>
                  <h4 className="discount">
                    <span className="cut">
                      Rs.{price + (price * discount) / 100}
                    </span>
                    <span className="persent">-{discount}%</span>
                  </h4>
                  <div className="rating" style={{ display: "flex" }}>
                    {[...Array(rating)].map(() => {
                      return <div>⭐</div>;
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <h1>loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homeproduct;
