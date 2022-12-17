import React, { useContext, useEffect, useState } from "react";
import { BsSearch, BsFillPersonFill } from "react-icons/bs";
import { logincontext } from "../context/contextprovider";
import { useCookies } from "react-cookie";
import { searchbyopt } from "../redux/actions/productactions";
import {
  AiFillHome,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { MdCircleNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = ({ type }) => {
  const dispatch = useDispatch();
  const productsearched = useSelector((state) => state.searchopt);

  const productlist = useSelector((state) => state.Allproduct.products);

  const [search, setsearch] = useState();

  const [Showsearch, setShowsearch] = useState(true);

  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const { cartitem, setcartitem } = useContext(logincontext);

  const token = cookies.Token;
  const linkto = useNavigate();
  const ordernumber = 1;

  const signout = () => {
    removeCookie("Email", cookies.Email);
    removeCookie("Name", cookies.Name);
    removeCookie("Phone", cookies.Phone);
    removeCookie("Token", cookies.Token);
    window.location.reload(false);
  };

  const getvaliduser = async () => {
    const response = await fetch("http://localhost:8000/user/validuser", {
      method: "GET",
      headers: {
        "Auth-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      Credentials: "include",
    });
    const cartitem = await response.json();

    if (response.status !== 201 || !cartitem) {
      console.log("error");
    } else {
      setcartitem(cartitem.carts);
    }
  };
  useEffect(() => {
    getvaliduser();
  }, []);

  const handlesearch = (text) => {
    setsearch(text);
    setShowsearch(false);
  };

  const handleopt = (opt) => {
    dispatch(searchbyopt(opt));
  };

  return (
    <div className="navbar">
      <div className="top">
        <div className="logo" onClick={() => linkto("/")}>
          e-Store
        </div>
        {type !== "off" && (
          <div className="search">
            <select
              classname="category"
              onChange={(e) => handleopt(e.target.value)}
            >
              <option value="">All</option>
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
            <div className="wholesearch">
              <input
                type="text"
                name="search"
                placeholder={productsearched}
                value={search}
                onChange={(e) => handlesearch(e.target.value)}
              />
              {search && (
                <div className="searchitem" hidden={Showsearch}>
                  {productlist
                    .filter((product) =>
                      product.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((currentproduct) => {
                      return (
                        <li
                          onClick={() =>
                            linkto(`product/${currentproduct._id}`)
                          }
                        >
                          {currentproduct.title}
                        </li>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="searchbtn">
              <BsSearch onClick={() => linkto("/searched_by_category")} />
            </div>
          </div>
        )}

        <div className="bottom">
          <div className="home" onClick={() => linkto("/")}>
            <span id="home">
              <AiFillHome />
            </span>
            <label htmlFor="home">Home</label>
          </div>
          <div className="home">
            <span id="message">
              <MdCircleNotifications />
            </span>
            <label htmlFor="message">Message</label>
          </div>
          <div className="home" onClick={() => linkto("/cart")}>
            <span id="cart">
              <span className="cartitemno" style={{ color: "orangered" }}>
                {cartitem.length > 0 ? cartitem.length : ""}
              </span>
              <AiOutlineShoppingCart />
            </span>
            <label htmlFor="cart">Cart</label>
          </div>
          <div className="home">
            <span id="account">
              <BsFillPersonFill />
            </span>
            <label htmlFor="account">Account</label>
            {token ? (
              <div className="onHover">
                <h1>{cookies.Email}</h1>
                <button onClick={signout}>Sign out</button>
              </div>
            ) : (
              <div className="onHovers">
                <button onClick={() => linkto("/Userauthentication")}>
                  Sign In
                </button>
              </div>
            )}
          </div>
          <div className="home">
            <span id="order">
              <span className="orderitemno" style={{ color: "orangered" }}>
                {ordernumber <= 0 ? "" : ordernumber}
              </span>
              <AiOutlineUnorderedList />
            </span>
            <label htmlFor="order">Order</label>
            {ordernumber <= 0 && (
              <div className="onHovers">
                <h4>No Order</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
