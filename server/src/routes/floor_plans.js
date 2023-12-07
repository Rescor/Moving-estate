const { Router } = require("express");
const { Property, FloorPlan, Amenity } = require("../models");

async function index(req, res) {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const floorPlans = property.floorPlansDetail();

    return res.status(200).json({ floorPlans });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  const { id } = req.params;
  const { name, url } = req.body;

  try {
    await FloorPlan.create({ name: name, url: url, propertyId: id });

    const property = await Property.findByPk(id, { include: { all: true } });

    res.status(200).json(await property.detailView(Amenity));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  const { id, floorPlanId } = req.params;
  const { name, url } = req.body;

  try {
    const floor_plan = await FloorPlan.findByPk(floorPlanId);
    await floor_plan.update({ name, url });

    const property = await Property.findByPk(id, { include: { all: true } });

    res.status(200).json(await property.detailView(Amenity));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function destroy(req, res) {
  const { id, floorPlanId } = req.params;

  try {
    const floor_plan = await FloorPlan.findByPk(floorPlanId);
    await floor_plan.destroy();

    const property = await Property.findByPk(id, { include: { all: true } });

    res.status(200).json(await property.detailView(Amenity));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = Router({ mergeParams: true })
  .get("/", index)
  .post("/", create)
  .put("/:floorPlanId", update)
  .delete("/:floorPlanId", destroy);

module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
