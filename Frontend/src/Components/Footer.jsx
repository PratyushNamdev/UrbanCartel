import React from "react";
import Style from "../CSS/Footer.module.css";
export default function Footer() {
  return (
    <section className={Style.footer}>
      <div className={Style.footer_Container}>
        <div className={Style.footer_Element}>
          <ul>
            <li>
              <strong>Created By-</strong>
            </li>
            <li>
              <a href="/" target="_main">Pratyush Namdev</a>
            </li>
          </ul>
        </div>
        <div className={Style.footer_Element}>
        <ul>
                <li><strong>Connect with us-</strong></li>
                <li><a href="https://in.linkedin.com/in/pratyush-namdev-8ab8a424a?trk=public_post_feed-actor-name">LinkedIn</a></li>
                <li><a href="https://github.com/PratyushNamdev">Github</a></li>
                <li><a href="https://www.instagram.com/get_me_some_coffeee">Instagram</a></li>
                <li><a href="https://www.facebook.com/pratyush.namdev.9/?locale=hi_IN">Facebook</a></li>
              
            </ul>
        </div>
        <div className={Style.footer_Element}>
            <ul>
                <li><strong>Contact Us-</strong></li>
                <li><a href="mailto:pratyushnamdev140@gmail.com">pratyushnamdev140@gmail.com</a></li>
                <li><span>Phone no. - 99xxxxxx47</span></li>
            </ul>
        </div>
       
       
      </div>
    </section>
  );
}
