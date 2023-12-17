const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "pratyushnamdev140@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
  });

 const setOrderPlacedMailOption = (email , productListHTML , totalAmt)=>{
   return {
        from: "pratyushnamdev140@gmail.com",
        to: email,
        subject: "Order Placed",
        html: `
      <html>
        <head>
          <style>
          body{
            background-color:black
          }
          h1{
            color: rgb(253, 216, 53);
          }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: black;
              color:rgb(253, 216, 53);
            }
          </style>
        </head>
        <body>
        <h1>Urban Cartel</h1>
          <h2>Your Order Details</h2>
          <table>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            ${productListHTML}
          </table>
          <p><strong>Total Amount:</strong>₹ ${totalAmt}</p>
          <p>Thank you for shopping with us.</p>
        </body>
      </html>
    `,
      };
   
 }

 module.exports = {transporter , setOrderPlacedMailOption};