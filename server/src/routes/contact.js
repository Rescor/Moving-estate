const { Router } = require("express");
const nodeMailer = require("nodemailer");
const config = require("config");
const MAIL = config.get("mail");
const { Message } = require("../models");

async function create(req, res) {
  const { clientName, clientEmail, clientMessage, agentEmail, propertyId } =
    req.body;

  try {
    Message.create({
      client_name: clientName,
      client_email: clientEmail,
      message: clientMessage,
      property_id: propertyId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  const transporter = nodeMailer.createTransport(MAIL);

  try {
    await transporter.sendMail({
      from: `${clientName} <${clientEmail}>`,
      to: agentEmail,
      subject: `Property ${propertyId}`,
      text: clientMessage,
    });

    res.status(200).json({ message: "Thank you!" });
  } catch (error) {
    res.status(404).json({ error: "Message could not be sent" });
  }
}

module.exports = Router().post("/", create);

module.exports.create = create;
