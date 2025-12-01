import "dotenv/config";
import nodemailer from "nodemailer";

import { reset_mail_template, register_template, order_template, active_mail_template } from "../utils/constant.js";
const USER_EMAIL = process.env.USER_EMAIL
const USER_PASSWORD = process.env.USER_PASSWORD

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
})
export const sendMail = async (email: string, link: string, type: "reset" | "register" | "order" | "active", metaData: any = {}) => {
  switch (type) {
    case "reset":
      await transporter.sendMail({
        from: USER_EMAIL,
        to: email,
        subject: "Reset Password Request",
        html: reset_mail_template(email, link),
      });
      break;
    case "register":
      await transporter.sendMail({
        from: USER_EMAIL,
        to: email,
        subject: "Resgister Your Account",
        html: register_template(link, metaData.template_password),
      });
      break;
    case "active":
      await transporter.sendMail({
        from: USER_EMAIL,
        to: email,
        subject: "Activate Your Account",
        html: active_mail_template(email, link),
      });
      break;
    case "order":
      await transporter.sendMail({
        from: USER_EMAIL,
        to: email,
        subject: `Order Confirmation - Order #${metaData.orderId}`,
        html: order_template(
          {
            dateOrder: metaData.dateOrder,
            orderId: metaData.orderId,
            receiver: metaData.receiver,
            address: metaData.address,
            items: metaData.items,
            totalPrice: metaData.totalPrice,
            shippingFee: metaData.shippingFee,
            tax: metaData.tax,
            discount: metaData.discount,
            totalPay: metaData.totalPay
          }
        ),
      });
      break;
    default:
      throw new Error("Invalid email type");
  }
}


