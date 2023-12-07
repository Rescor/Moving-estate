const { Router } = require("express");
const { Agent, Property } = require("../models");

async function index(_, res) {
  try {
    return res.json({ agents: await Agent.findAll() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function read(req, res) {
  const { id } = req.params;

  let agent;

  try {
    agent = await Agent.findByPk(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  if (!agent) return res.status(404).json({ agent: {} });

  return res.json({ agent });
}

async function create(req, res) {
  const { name, location, email, photo } = req.body;

  try {
    const agent = await Agent.create({ name, location, email, photo });

    return res.status(200).json({ agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { name, location, email, photo } = req.body;

  let agent;

  try {
    agent = await Agent.findByPk(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  if (!agent)
    return res
      .status(404)
      .json({ error: `Agent with id = ${id} doesn't exist` });

  try {
    agent.update({ name, location, email, photo });

    return res.json({ agent });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}

function reassignProperties(oldAgentId, newAgentId) {
  Property.update(
    { agentId: newAgentId },
    {
      where: {
        agentId: oldAgentId,
      },
    }
  );
}

async function destroy(req, res) {
  const { id } = req.params;
  const { newAgentId } = req.body;
  let agent;

  try {
    agent = await Agent.findByPk(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  if (!agent)
    return res
      .status(404)
      .json({ error: `Agent with id = ${id} doesn't exist` });

  try {
    reassignProperties(id, newAgentId);

    res.json(await agent.destroy());
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}

module.exports = Router()
  .get("/", index)
  .get("/:id", read)
  .post("/", create)
  .put("/:id", update)
  .delete("/:id", destroy);

module.exports.index = index;
module.exports.read = read;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
