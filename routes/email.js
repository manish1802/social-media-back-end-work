import express from "express";
import nodemailer from "nodemailer";
// const nodemailer = require(`nodemailer`);

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: `mk8418954@gmail.com`,
    pass: `xizqzhavpdyclfsy`,
  },
  secure: true,
});
const emailrouter = express.Router();

emailrouter.post("/send", (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: `mk8418954@gmail.com`,
    to: `mk8418954@gmail.com`,
    subject: `subject`,
    text: `text`,
    html: `<b>Hey! </b><br> This is our first message sent with
        Nodemailer<br/>`,
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});
emailrouter.post(`/attachments-mail`, (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: `narpalaamar@gmail.com`,
    to: `narpalaamar@gmail.com`,
    subject: `subject`,
    text: `text`,
    html: `<b>Hey! </b><br> This is our first attachment sent
    with Nodemailer<br/>`,
    attachments: [
      {
        filename: `one.png`,
        path: `./one.png`,
      },
      {
        filename: `amar.txt`,
        path: `./amar.txt`,
      },
    ],
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});
export default emailrouter;
