import React from 'react'
import Footer from "./Footer";
export default function ServerErrorMessage() {
  return (
    <div>
       <div style={{
         padding: "2em",
         maxWidth: "800px",
         
         margin: "0 auto"
       }}>
        <div>
          <img
            src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1706297576/Urban%20Cartel/3819287_uvarnn.jpg"
            alt="Server Error"
            />
        </div>
        <div>
          <em>
            Server hiccup! <br /> 🔧 Our backend is hosted on a free service,so occasional setbacks are part of the deal. Don't worry, I'm on it and fixing
            things up. We'll be back online in no time. Thanks for your
            patience! ☕👩‍💻
            <br /> <br />
            P.S: I hope you're not an HR 'cause this may lead a bad impression
          </em>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
