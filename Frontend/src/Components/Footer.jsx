import React from "react";
import Style from "../CSS/Footer.module.css";
import { Link } from "react-router-dom";
import {
  LinkedInIcon,
  GithubIcon,
  GmailIcon,
  ResumeIcon,
} from "../Helper/icon";

export default function Footer() {
  return (
    <section className={Style.footer}>
      <div className={Style.footer_Container}>
        <Link to="/">
          <div className={Style.logoContainer}>
            <img
              src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1699092991/Urban%20Cartel/vduimzdz9cntsvpli9xm.png"
              alt="Urban Cartel"
            />
          </div>
        </Link>

        <div className={Style.wrapper}>
          <h4>Creator's Message</h4>
          <p>
            Urban Cartel stands as a sophisticated MERN-based E-Commerce web
            application. The backend is hosted on{" "}
            <a href="https://render.com">RENDER</a> , with{" "}
            <a href="https://www.mongodb.com">MongoBD Atlas</a> serving for our
            database operations. This project is a personal showcase of my
            skills in MERN Stack. <br /> <br />{" "}
            <strong>Please sign-up to use all the features.</strong>
          </p>
        </div>
        <br />

        <hr style={{ borderColor: "#FFF" }} />
        <br />
        <div className={Style.iconWrapper}>
          <strong>Connect with us - </strong>
          <ul>
            <li>
              <div>
                {" "}
                <a href="https://in.linkedin.com/in/pratyush-namdev-8ab8a424a?trk=public_post_feed-actor-name">
                  <LinkedInIcon /><br />
                  <div className={Style.iconText}>Linkedin</div>
                </a>
              </div>
            </li>
            <li>
              <div>
                <a href="https://github.com/PratyushNamdev">
                  <GithubIcon /><br />
                  <div className={Style.iconText}>Github</div>
                </a>
              </div>
            </li>
            <li>
              <div>
                <a href="mailto:pratyushnamdev140@gmail.com">
                  <GmailIcon /><br />
                  <div className={Style.iconText}>Mail</div>
                </a>
              </div>
            </li>
            <li>
              <div>
                <a href="https://pratyushnamdevresume.tiiny.site">
                  <ResumeIcon /> <br />
                  <div className={Style.iconText}>Resume</div>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className={Style.message}>
          <strong>Crafted with passion by Pratyush Namdev ✨</strong>
        </div>
      </div>
    </section>
  );
}

//  <section className={Style.footer}>
//       <div className={Style.footer_Container}>
//         <div className={`${Style.logoContainer} ${Style.footer_Element}`}>
//           <img src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1699092991/Urban%20Cartel/vduimzdz9cntsvpli9xm.png" alt="Urban Cartel" />
//         </div>
//         <div className={Style.footer_Element}>
//           <ul>
//             <li>
//               <strong>Created By-</strong>
//             </li>
//             <li>
//               <a href="/" target="_main">Pratyush Namdev</a>
//             </li>
//           </ul>
//         </div>
//         <div className={Style.footer_Element}>
//         <ul>
//                 <li><strong>Connect with us-</strong></li>
//                 <li><a href="https://in.linkedin.com/in/pratyush-namdev-8ab8a424a?trk=public_post_feed-actor-name"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"/></svg></a></li>
//                 <li><a href="https://github.com/PratyushNamdev">Github</a></li>
//                 <li><a href="https://www.instagram.com/get_me_some_coffeee">Instagram</a></li>
//                 <li><a href="https://www.facebook.com/pratyush.namdev.9/?locale=hi_IN">Facebook</a></li>

//             </ul>
//         </div>
//         <div className={Style.footer_Element}>
//             <ul>
//                 <li><strong>Contact Us-</strong></li>
//                 <li><a href="mailto:pratyushnamdev140@gmail.com">pratyushnamdev140@gmail.com</a></li>
//                 <li><div>Phone no. - 99xxxxxx47</div></li>
//             </ul>
//         </div>

//       </div>
//     </section>
