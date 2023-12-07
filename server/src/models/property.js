"use strict";

const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.belongsTo(models.Agent, { as: "agent", foreignKey: "agentId" }),
        Property.hasMany(models.PropertyImage, {
          as: "images",
          foreignKey: "propertyId",
        }),
        Property.belongsToMany(models.Amenity, {
          as: "amenities",
          through: models.PropertyAmenity,
          foreignKey: "propertyId",
        }),
        Property.belongsToMany(models.Feature, {
          as: "features",
          through: models.PropertyFeature,
          foreignKey: "propertyId",
        }),
        Property.hasMany(models.FloorPlan, {
          as: "floor_plans",
          foreignKey: "propertyId",
        }),
        Property.hasMany(models.Message, {
          as: "messages",
          foreignKey: "propertyId",
        });
    }

    static filter(filters) {
      const { minArea, maxArea, minPrice, maxPrice, ...other } = filters;

      return this.findAll({
        where: [
          minArea && { area: { [Op.gt]: minArea } },
          maxArea && { area: { [Op.lt]: maxArea } },
          minPrice && { price: { [Op.gt]: minPrice } },
          maxPrice && { price: { [Op.lt]: maxPrice } },
          other,
        ],
        include: { all: true },
      });
    }

    static getAgentProperties(agentId) {
      return this.findAll({
        where: { agentId: agentId },
        include: { all: true },
      });
    }

    static async getOptions() {
      const properties = await this.findAll();

      const extract = (key) => [
        ...new Set(properties.map((property) => property[key])),
      ];

      const options = {
        type: extract("type").sort() || [],
        mode: extract("mode").sort() || [],
        bedrooms:
          extract("bedrooms").sort((a, b) => {
            return a - b;
          }) || [],
        bathrooms:
          extract("bathrooms").sort((a, b) => {
            return a - b;
          }) || [],
        location: extract("location").sort() || [],
      };

      return options;
    }

    async amenitiesDetail(Amenity) {
      const amenities = await Amenity.findAll();

      return amenities.map((amenity) => {
        const available = this.amenities.some(
          (propertyAmenity) => propertyAmenity.title === amenity.title
        );

        return {
          ...amenity.simpleView(),
          available: available,
        };
      });
    }

    floorPlansDetail() {
      return this.floor_plans.map((floor_plan) => {
        return floor_plan.simpleView();
      });
    }

    featuresDetail() {
      return this.features.map((feature) => {
        return feature.simpleView();
      });
    }

    imagesDetail() {
      return this.images.map((image) => {
        return image.simpleView();
      });
    }

    async detailView(Amenity) {
      return {
        id: this.id,
        title: this.title,
        location: this.location.split(", "),
        images: this.imagesDetail(),
        description: this.description,
        type: this.type,
        mode: this.mode,
        price: this.price,
        area: this.area,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
        amenities: await this.amenitiesDetail(Amenity),
        features: this.featuresDetail(),
        floor_plans: this.floorPlansDetail(),
        agent: {
          name: this.agent.name,
          location: this.agent.location,
          email: this.agent.email,
          photo: this.agent.photo,
        },
      };
    }

    summaryView() {
      const image = this.images.length > 0 ? this.images[0].link : "";

      return {
        id: this.id,
        title: this.title,
        location: this.location.split(", "),
        image: image,
        description: this.description,
        type: this.type,
        mode: this.mode,
        price: this.price,
        area: this.area,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
      };
    }
  }

  Property.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      area: DataTypes.INTEGER,
      bedrooms: DataTypes.INTEGER,
      bathrooms: DataTypes.INTEGER,
      agentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Property",
    }
  );
  return Property;
};
