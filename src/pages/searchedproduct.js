import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { logincontext } from "../context/contextprovider";
import Navbar from "../component/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../component/Footer";
import item from "./img/offer2.png";
import { searchbyopt } from "../redux/actions/productactions";
import { useNavigate } from "react-router-dom";
const Searchedproduct = () => {
  const dispatch = useDispatch();
  const { cartitem, setcartitem } = useContext(logincontext);
  const [cookies, setCookie] = useCookies(["name"]);
  const [productlist, setproductlist] = useState([]);

  const tokken = cookies.Token;
  const Nav = useNavigate();
  const productsearched = useSelector((state) => state.searchopt);
  const List = productlist.filter(
    (product) => product.category === productsearched
  );

  const callproductlist = async (req, res) => {
    const response = await axios
      .get("http://localhost:8000/product/list")
      .catch((err) => console.log(err));
    setproductlist(response.data);
  };

  useEffect(() => {
    callproductlist();
  }, [productsearched]);
  const Handleopt = (opt) => {
    dispatch(searchbyopt(opt));
  };

  const Addcart = async (id) => {
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
    <div className="product_container">
      <Navbar type="off" />
      <div className="searchedproduct">
        <div className="leftproduct">
          <img src={item} alt="offers" />
        </div>
        <div className="rightproduct">
          <div className="left">
            <h2 className="givemb">Category:</h2>
            <select
              classname="categoryopt"
              value={productsearched}
              onChange={(e) => Handleopt(e.target.value)}
            >
              <option value="Books">Books</option>
              <option value="Beauty & personal care">
                Beauty & personal care
              </option>
              <option value="Girl's Fashion">Girl's Fashion</option>
              <option value="Boy's Fashion">Boy's Fashion</option>
              <option value="Toys and Game">Toys and Game</option>
              <option value="Computer & Laptops">Computer & Laptops</option>
              <option value="Home & kitchen">Home & kitchen</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Food Related">Food Related</option>
            </select>
          </div>
          <div className="right">
            {List.length > 0
              ? List.map((curr) => {
                  console.log(`curr ${List}`);
                  return (
                    <div className="items" key={curr._id}>
                      <div
                        className="productbg"
                        style={{
                          backgroundImage: `url(${curr.Pimage.secure_url})`,
                        }}
                      >
                        <p className="dispercent">-{curr.discount}%</p>
                      </div>
                      <p className="itemname" style={{ fontSize: "18px" }}>
                        {curr.title}
                      </p>
                      <p className="itemprice" style={{ color: "green" }}>
                        Price:Rs {curr.price}
                      </p>
                      <div className="itemrating" style={{ display: "flex" }}>
                        {[...Array(curr.rating)].map(() => {
                          return <div>⭐</div>;
                        })}
                      </div>
                      <div className="Searchedbtns">
                        <div onClick={() => Addcart(curr._id)}>Add To Cart</div>
                        <div style={{ backgroundColor: "orangered" }}>
                          Buy Now
                        </div>
                      </div>
                    </div>
                  );
                })
              : productlist
                  .filter((product) => product.category === "Books")
                  .map((curr) => {
                    return (
                      <div className="items" key={curr._id}>
                        <div
                          className="productbg"
                          style={{
                            backgroundImage: `url(${curr.Pimage.secure_url})`,
                          }}
                        >
                          <p className="dispercent">-{curr.discount}%</p>
                        </div>
                        <p className="itemname" style={{ fontSize: "18px" }}>
                          {curr.title}
                        </p>
                        <p className="itemprice" style={{ color: "green" }}>
                          Price:Rs {curr.price}
                        </p>
                        <div className="itemrating" style={{ display: "flex" }}>
                          {[...Array(curr.rating)].map(() => {
                            return <div>⭐</div>;
                          })}
                        </div>
                        <div className="Searchedbtns">
                          <div onClick={() => Addcart(curr._id)}>
                            Add To Cart
                          </div>
                          <div style={{ backgroundColor: "orangered" }}>
                            Buy Now
                          </div>
                        </div>
                      </div>
                    );
                  })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Searchedproduct;
