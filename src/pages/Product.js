import React, { useContext, useEffect } from "react";
import Contactus from "../component/Contactus";
import Footer from "../component/Footer";
import { selectproductid } from "../redux/actions/productactions";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import { logincontext } from "../context/contextprovider";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const [cookies, setCookie] = useCookies(["name"]);
  const { cartitem, setcartitem } = useContext(logincontext);

  const tokken = cookies.Token;
  const Nav = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product);

  const { Pimage, title, price, about, _id, rating } = item;

  const calldata = async () => {
    const response = await axios
      .get(`http://localhost:8000/product/${id}`)
      .catch((err) => console.log(err));
    const data = response.data;
    dispatch(selectproductid(data));
  };
  useEffect(() => {
    if (id && id !== "") calldata();
  }, []);

  const Buynow = () => {
    if (!tokken) {
      alert("!please login first");
      Nav("/Userauthentication");
    } else {
      alert("you can buy now");
    }
  };
  const Addtocart = async (id) => {
    if (!tokken) {
      alert("!please login first");
      Nav("/Userauthentication");
    } else {
      const checkers = await fetch(`http://localhost:8000/user/addcart/${id}`, {
        method: "POST",
        headers: {
          "Auth-token": tokken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item,
        }),
        Credentials: "include",
      });

      const CART = await checkers.json();
      console.log(CART);
      if (checkers.status === 401 || !CART) {
        console.log("user invalid");
        alert("user invalid");
      } else {
        alert("added to cart");
        setcartitem(CART.carts);
        Nav("/cart");
      }
    }
  };

  return (
    <div>
      <Navbar type="off" />
      {Object.keys(item).length === 0 ? (
        <h4>loading...</h4>
      ) : (
        <div className="Individualproduct" key={_id}>
          <div className="img">
            <img src={Pimage.secure_url} alt="Individualproduct" />
          </div>
          <div className="info">
            <h2 className="TTitle">{title}</h2>
            <div className="rating" style={{ display: "flex" }}>
              {[...Array(rating)].map(() => {
                return <div>⭐</div>;
              })}
            </div>{" "}
            <span className="price">
              <span style={{ color: "black" }}>Price</span> Rs.{price}
            </span>
            <span className="aboutproduct">{about}</span>
            <div className="addsection">
              <button className="cart" onClick={() => Addtocart(_id)}>
                Add To Cart
              </button>
              <button onClick={Buynow}>Buy Now</button>
            </div>
          </div>
        </div>
      )}
      <Contactus />
      <Footer />
    </div>
  );
};

export default Product;
