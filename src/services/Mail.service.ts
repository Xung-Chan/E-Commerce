import "dotenv/config";
import nodemailer from "nodemailer";

import { reset_mail_template } from "../utils/constant.js";
const USER_EMAIL = process.env.USER_EMAIL
const USER_PASSWORD = process.env.USER_PASSWORD

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
})
export const sendMail = async (email: string, link: string) => {
  await transporter.sendMail({
    from: USER_EMAIL,
    to: email,
    subject: "Reset Password Request",
    html: reset_mail_template(email, link),
  });
}
