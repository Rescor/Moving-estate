const { Router } = require("express");
const nodeMailer = require("nodemailer");
const config = require("config");
const MAIL = config.get("mail");
const { Message } = require("../models")

async function create(req, res) {
  const { clientName, clientEmail, clientMessage, agentEmail, propertyId } = req.body;

  Message.create({
    client_name: clientName,
    client_email: clientEmail,
    message: clientMessage,
    property_id: propertyId
  })

  const transporter = nodeMailer.createTransport(MAIL);

  try {
    await transporter.sendMail({
      from: `${clientName} <${clientEmail}>`,
      to: agentEmail,
      subject: `Property ${propertyId}`,
      text: clientMessage,
    });

    res.json({ message: "Thank you!" });
  } catch (error) {
    res.status(404).json({ error: "Message could not be sent" });
  }
}

module.exports = Router()
  .post("/", create);
