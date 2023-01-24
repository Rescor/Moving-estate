const { Router } = require("express");
const amenities = require("./amenities.js");
const floor_plans = require("./floor_plans.js");
const images = require("./images.js");
const features = require("./features.js");
const { Message, Property, Agent, Amenity } = require("../models");

async function read(req, res) {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });

    return res.status(200).json(await property.summaryView(Amenity));
  } catch (error) {
    return res.status(404).json({ error: `Property with id ${id} not found` });
  }
}

async function index(req, res) {
  const { email } = req.query;

  try {
    const agent = await Agent.findOne({ where: { email: email } });
    const properties = await Property.getAgentProperties(agent.id);

    return res.json({
      properties: properties.map((property) => property.summaryView()),
      agentName: agent.name,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Agent with email: ${email} does not exist` });
  }
}

async function create(req, res) {
  const email = "jsmastery2022@gmail.com";
  const agentId = await Agent.findOne({ where: { email } }).then(
    (agent) => agent.id
  );

  try {
    const property = await Property.createProperty(
      { ...req.body, agentId },
      Amenity
    );

    return res.status(200).json({ property });
  } catch (error) {
    return res.status(403).json({ error });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const {
    title,
    location,
    description,
    type,
    mode,
    price,
    area,
    bedrooms,
    bathrooms,
  } = req.body;

  let property = await Property.findByPk(id, { include: { all: true } });

  if (!property)
    return res
      .status(404)
      .json({ error: `Property with id = ${id} doesn't exist` });

  try {
    await property.updateProperty({
      title,
      location,
      description,
      type,
      mode,
      price,
      area,
      bedrooms,
      bathrooms,
    });

    return res.json(await property.detailView(Amenity));
  } catch (error) {
    res.status(403).json({ error });
  }
}

async function destroy(req, res) {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);

    res.json(await property.destroy());
  } catch (error) {
    res.status(403).json({ error });
  }
}

async function retrieve(req, res) {
  const { id } = req.params;
  const { email } = req.query;

  const agent = await Agent.findOne({
    where: { email: email },
    include: { model: Property, where: { id: id } },
  });

  if (!agent) return res.status(401).json();

  const messages = await Message.findAll({ where: { propertyId: id } });

  return res.json(messages);
}

module.exports = Router()
  .get("/messages/:id", retrieve)
  .get("/", index)
  .get("/:id", read)
  .post("/", create)
  .put("/:id", update)
  .delete("/:id", destroy)
  .use("/:id/images", images)
  .use("/:id/floor_plans", floor_plans)
  .use("/:id/amenities", amenities)
  .use("/:id/features", features);
