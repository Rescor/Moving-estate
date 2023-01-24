const { Router } = require("express");
const { Property, PropertyImage, Amenity } = require("../models");

async function create(req, res) {
  const { id } = req.params;
  const { link } = req.body;

  try {
    await PropertyImage.create({ link, propertyId: id });

    const property = await Property.findByPk(id, { include: { all: true } });

    res.json(await property.detailView(Amenity));
  } catch (error) {
    res.status(403).json({ error });
  }
}

async function index(req, res) {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });
    const images = property.imagesDetail();

    return res.json({ images });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function update(req, res) {
  const { id, imageId } = req.params;
  const { link } = req.body;

  try {
    const image = await PropertyImage.findByPk(imageId);
    await image.update({ link });

    const property = await Property.findByPk(id, { include: { all: true } });

    res.json(await property.detailView(Amenity));
  } catch (error) {
    res.status(403).json({ error });
  }
}

async function destroy(req, res) {
  const { id, imageId } = req.params;

  try {
    const image = await PropertyImage.findByPk(imageId);
    await image.destroy();

    const property = await Property.findByPk(id, { include: { all: true } });

    res.json(await property.detailView(Amenity));
  } catch (error) {
    res.status(403).json({ error });
  }
}

module.exports = Router({ mergeParams: true })
  .get("/", index)
  .post("/", create)
  .put("/:imageId", update)
  .delete("/:imageId", destroy);
