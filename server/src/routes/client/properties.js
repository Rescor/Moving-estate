const { Router } = require("express");
const { Property, Amenity } = require("../../models");

async function index(req, res) {
  const { page, ...filters } = req.query;
  const options = await Property.getOptions();

  try {
    const properties = await Property.filter(filters);
    const filteredProperties = properties.map((property) =>
      property.summaryView()
    );

    const pageSize = 8;
    let propertiesPages = [];

    for (let i = 0; i < filteredProperties.length; i += pageSize) {
      propertiesPages.push(filteredProperties.slice(i, i + pageSize));
    }

    return res.status(200).json({
      properties: propertiesPages[Number(page) - 1] || [],
      options: options,
      pages: propertiesPages.length,
    });
  } catch (error) {
    return res.status(500).json({ options, properties: [], pages: 0 });
  }
}

async function read(req, res) {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id, { include: { all: true } });

    return res.status(200).json(await property.detailView(Amenity));
  } catch (error) {
    return res.status(404).json();
  }
}

module.exports = Router().get("/", index).get("/:id", read);
