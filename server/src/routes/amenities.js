const { Router } = require("express");
const { Property, Amenity } = require("../models");

async function create(req, res) {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const newAmenity = await Amenity.findOne({ where: { title: title } });

    await property.addAmenity(newAmenity);

    const updatedProperty = await Property.findByPk(id, {
      include: { all: true },
    });

    res.status(200).json(await updatedProperty.detailView(Amenity));
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}

async function index(req, res) {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const amenities = await property.amenitiesDetail(Amenity);

    return res.status(200).json({ amenities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function destroy(req, res) {
  const { id, amenityTitle } = req.params;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const amenityToRemove = await Amenity.findOne({
      where: { title: amenityTitle },
    });

    await property.removeAmenity(amenityToRemove);

    const updatedProperty = await Property.findByPk(id, {
      include: { all: true },
    });

    res.status(200).json(await updatedProperty.detailView(Amenity));
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}

module.exports = Router({ mergeParams: true })
  .get("/", index)
  .post("/", create)
  .delete("/:amenityTitle", destroy);

module.exports.create = create;
module.exports.index = index;
module.exports.destroy = destroy;
