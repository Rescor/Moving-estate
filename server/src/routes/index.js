const { Router } = require("express");
const config = require("./config.js");
const clientProperties = require("./client/properties.js");
const properties = require("./properties.js");
const contact = require("./contact.js");
const auth = require("./auth.js");
const agents = require("./agents.js");

module.exports = Router()
  .use("/client/properties", clientProperties)
  .use("/properties", properties)
  .use("/contact", contact)
  .use("/auth", auth)
  .use("/agents", agents)
  .get("/config", config);
