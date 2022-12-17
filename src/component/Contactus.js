import React, { useRef } from "react";
import { useCookies } from "react-cookie";
import emailjs from "@emailjs/browser";

const Contactus = () => {
  const [cookies, setCookie] = useCookies(["name"]);

  const name = cookies.Name;
  const email = cookies.Email;
  const form = useRef();

  const sendenail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l2wcxch",
        "template_m8z56he",
        form.current,
        "aoG5kMLnnZhqV7Tj-"
      )
      .then(
        (result) => {
          alert("message send");
          window.location.reload(false);
        },
        (error) => {
          alert("message can't be send");
        }
      );
  };

  return (
    <div className="contacts">
      <form className="contact" ref={form}>
        <h1>Contact Us</h1>
        <div className="user">
          <div className="name">
            <label htmlFor="name">Full Name</label>
            {name ? (
              <input type="text" name="user_name" value={name} />
            ) : (
              <input
                type="text"
                name="user_name"
                placeholder="Enter FullName"
              />
            )}
          </div>
          <div className="Email">
            <label htmlFor="Email">Email</label>
            {email ? (
              <input type="text" name="user_email" value={email} />
            ) : (
              <input type="text" name="user_email" placeholder="Enter Email" />
            )}
          </div>
        </div>
        <div className="comment">
          <label htmlFor="cmt">Comment</label>
          <textarea name="message" id="cmt" cols="30" rows="10" />
        </div>
        <button onClick={sendenail}>send</button>
      </form>
    </div>
  );
};

export default Contactus;
