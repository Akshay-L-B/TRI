import Tutor from "../../models/Tutor"; // Assuming tutor is your mongoose model for tutors
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let tutor = await Tutor.findOne({ email: req.body.email });
    //Indetify the tutor with help of email
    console.log(tutor);
    if (tutor) {
      //Encrypt the password the user types in using Cypto-JS
      const bytes = CryptoJS.AES.decrypt(tutor.password, "ashbd");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      console.log(originalText);
      if (
        req.body.email === tutor.email &&
        req.body.password === originalText
      ) {
        //check whether the email and the encrypted password matches the one in the databse
        var token = jwt.sign(
          { email: tutor.email, name: tutor.name },
          "ashbd",
          {
            expiresIn: "2d",
          }
        );
        const staffID = tutor.staffID;
        res.status(200).json({ success: true, token, staffID });
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No tutor found" });
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
