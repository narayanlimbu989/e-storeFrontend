import React, { useEffect, useState, useContext } from "react";
import { logincontext } from "../context/contextprovider";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Cart = () => {
  const { cartitem, setcartitem } = useContext(logincontext);

  const [cookie, setcookie] = useCookies();
  const tokken = cookie.Token;
  const [Cartlist, setcartlist] = useState("");
  const Getcartitem = async () => {
    const response = await fetch("http://localhost:8000/user/cartitems", {
      method: "GET",
      headers: {
        "Auth-token": tokken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      Credentials: "include",
    });
    const cartitem = await response.json();

    if (response.status !== 201 || !cartitem) {
      console.log("error");
    } else {
      setcartlist(cartitem.carts);
    }
  };
  useEffect(() => {
    Getcartitem();
  }, []);

  let Price = 0;

  const handleremove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/user/removeproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Auth-token": tokken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          Credentials: "include",
        }
      );
      const item = await response.json();

      if (response.status !== 201 || !item) {
        console.log("error");
      } else {
        console.log("successfully delete");
        setcartitem(item.carts);
        Getcartitem();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const linkto = useNavigate();
  return (
    <div className="carttt">
      <Navbar type="off" />
      {Cartlist.length > 0 ? (
        <div className="cartorder">
          <div className="right">
            {Cartlist.map((data) => {
              const { _id, Pimage, title, price } = data;
              Price += price;

              return (
                <div className="cartitem" key={_id}>
                  <div className="img">
                    <img src={Pimage.secure_url} alt="productimage" />
                  </div>
                  <h3 className="nameeee">{title}</h3>
                  <h4 className="price">Rs {price}</h4>
                  <div className="quantity">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                  </div>
                  <h1 className="closed">
                    <AiFillCloseCircle onClick={() => handleremove(_id)} />
                  </h1>
                </div>
              );
            })}
          </div>
          <div className="left">
            <h4>Order summery</h4>
            <div className="subtotal">
              <h5>subtotal({Cartlist.length} items)</h5>
              <h5>
                Rs.
                {Price}
              </h5>
            </div>
            <button>proceed to checkout</button>
          </div>
        </div>
      ) : (
        <div className="emptycart">
          <h3>cart is currently Empty.</h3>
          <button onClick={() => linkto("/")}>Go For Shopping</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
