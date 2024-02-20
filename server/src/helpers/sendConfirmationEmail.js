import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import "dotenv/config";
import { User } from "../models/user.js";
import pkg from "jsonwebtoken";
import { generateToken } from "../utils/tokenManager.js";

export const transport = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
  tls: { rejectUnauthorized: false }, //arregla el error del mail
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _path = path.join(__dirname, "..", "emails");

export const sendConfirmationEmail = async (token, email) => {
  let url = `${process.env.DEPLOY_CLIENT_URL}/confirm/${token}`;

  ejs.renderFile(
    _path + "/Confirmation.ejs",
    { email, url },
    async (error, data) => {
      if (error) {
        console.log(error);
      } else {
        try {
          await transport.sendMail({
            from: '"Karku cosmetica" karkucosmetica@gmail.com',
            to: email,
            subject: "Confirmacion de cuenta",
            html: data,
          });
          console.log("Email Send");
          return "Email Send";
        } catch (error) {
          console.log(error);
          return "Email fail to sent";
        }
      }
    }
  );
};

export const ResendConfirmationEmail = async (emailUser) => {
  let user = await User.findOne({ email: emailUser }, { password: 0 });
  let email = user.email;
  let id = user._id.toString();

  const { token } = generateToken(id);
  let url = `${process.env.DEPLOY_CLIENT_URL}/confirm/${token}`;

  ejs.renderFile(
    _path + "/Confirmation.ejs",
    { email, url },
    async (error, data) => {
      if (error) {
        console.log(error);
      } else {
        try {
          await transport.sendMail({
            from: '"Karku" karkucosmetica@gmail.com',
            to: email,
            subject: "Confirmacion de cuenta",
            html: data,
          });
          console.log("Email Send");
          return "Email Send";
        } catch (error) {
          console.log(error);
          return "Email fail to sent";
        }
      }
    }
  );
};




