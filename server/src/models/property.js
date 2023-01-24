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

    static getOptions() {
      return this.findAll().then((properties) => {
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
          location:
            extract("location").sort((a, b) => {
              return a - b;
            }) || [],
        };

        return options;
      });
    }

    static async createProperty(values, Amenity) {
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
        agentId,
      } = values;

      const lastId = await Property.findOne({
        attributes: ["id"],
        where: { type: type },
        order: [["id", "DESC"]],
        paranoid: false,
      }).then((property) => property.id);
      const id =
        lastId.charAt(0) +
        (Number(lastId.slice(1)) + 1).toString().padStart(3, "0");

      await Property.create({
        id,
        title,
        location,
        description,
        type,
        mode,
        price,
        area,
        bedrooms,
        bathrooms,
        agentId,
      });

      const property = await this.findByPk(id, { include: { all: true } });

      return await property.detailView(Amenity);
    }

    async updateProperty(values) {
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
      } = values;

      await this.update({
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

      return await Property.findByPk(this.id, { include: { all: true } });
    }

    async amenitiesDetail(Amenity) {
      const amenities = await Amenity.findAll().then((amenities) =>
        amenities.map((amenity) => amenity.title)
      );

      return amenities.map((amenityTitle) => {
        const available = this.amenities.some(
          (amenity) => amenity.title === amenityTitle
        );
        return {
          title: amenityTitle,
          available: available,
        };
      });
    }

    floorPlansDetail() {
      return this.floor_plans.map((floor_plan) => {
        return {
          floorPlanId: floor_plan.id,
          name: floor_plan.name,
          url: floor_plan.url,
        };
      });
    }

    featuresDetail() {
      return this.features.map((feature) => {
        return {
          feature: feature.icon,
          title: feature.PropertyFeature.title,
        };
      });
    }

    imagesDetail() {
      return this.images.map((image) => {
        return {
          imageId: image.id,
          link: image.link,
        };
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
