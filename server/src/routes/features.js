const { Router } = require("express");
const { Property, Feature, Amenity } = require("../models");

async function create(req, res) {
  const { id } = req.params;
  const { icon, title } = req.body;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const newFeature = await Feature.findOne({ where: { icon: icon } });

    if (await property.hasFeature(newFeature))
      return res.status(403).json({ error: "Feature icon already used" });

    await property.addFeature(newFeature, { through: { title: title } });

    const updatedProperty = await Property.findByPk(id, {
      include: { all: true },
    });

    res.status(200).json(await updatedProperty.detailView(Amenity));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function index(req, res) {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const features = property.featuresDetail();

    return res.status(200).json({ features });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  const { id, icon } = req.params;
  const { title } = req.body;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const featureToUpdate = await Feature.findOne({ where: { icon: icon } });

    await property.addFeature(featureToUpdate, { through: { title: title } });

    const updatedProperty = await Property.findByPk(id, {
      include: { all: true },
    });

    res.status(200).json(await updatedProperty.detailView(Amenity));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function destroy(req, res) {
  const { id, icon } = req.params;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const featureToRemove = await Feature.findOne({ where: { icon: icon } });

    await property.removeFeature(featureToRemove);

    const updatedProperty = await Property.findByPk(id, {
      include: { all: true },
    });

    res.status(200).json(await updatedProperty.detailView(Amenity));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = Router({ mergeParams: true })
  .get("/", index)
  .post("/", create)
  .put("/:icon", update)
  .delete("/:icon", destroy);

module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
