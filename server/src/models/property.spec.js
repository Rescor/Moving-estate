const { expect } = require("chai");
const sinon = require("sinon");
const { Property, PropertyImage, Amenity } = require("./");
const { Op } = require("sequelize");

describe("Property model", function () {
  let model;
  let img, img2;
  let agent;
  let features;
  let floorPlans;

  beforeEach(function () {
    agent = {
      name: "John Smith",
      location: "Warsaw, Poland",
      email: "smith@example.com",
      photo: "",
    };

    features = [
      {
        icon: "fence",
        noise: "remove",
        PropertyFeature: {
          title: "Some fence",
        },
      },
      {
        icon: "paw",
        PropertyFeature: {
          different_noise: "value",
          title: "Pets allowed",
        },
      },
      {
        icon: "pool",
        PropertyFeature: {
          title: "Big pool",
        },
      },
    ];

    floorPlans = [
      {
        id: 1,
        name: "f_p",
        url: "link",
      },
    ];

    model = Property.build(
      {
        id: 1,
        title: "test title",
        location: "Warsaw, Poland",
        description: "description",
        type: "rent",
        mode: "apartment",
        price: 1200,
        area: 520,
        bedrooms: 2,
        bathrooms: 2,
        agent: agent,
        images: [],
        features: features,
        floor_plans: floorPlans,
        amenities: [],
      },
      { include: { all: true } }
    );

    img = PropertyImage.build({ id: 1, link: "foo", propertyId: 1 });
    img2 = PropertyImage.build({ id: 2, link: "bar", propertyId: 1 });
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("#summaryView", function () {
    let result;

    beforeEach(function () {
      result = model.summaryView();
    });

    it("return number with property id", function () {
      expect(result.id).to.equal(1);
    });

    it("returns string with property title", function () {
      expect(result.title).to.equal("test title");
    });

    it("returns string with property location in array split by ', '", function () {
      expect(result.location).to.deep.equal(["Warsaw", "Poland"]);
    });

    it("returns string with empty value if there are no images", function () {
      expect(result.image).to.equal("");
    });

    it("returns string with first image url if there are multiple images", function () {
      model.images.push(img);
      model.images.push(img2);

      const resultWithImages = model.summaryView();

      expect(resultWithImages.image).to.equal("foo");
    });

    it("returns string with property description", function () {
      expect(result.description).to.equal("description");
    });

    it("returns string with property type", function () {
      expect(result.type).to.equal("rent");
    });

    it("returns string with property mode", function () {
      expect(result.mode).to.equal("apartment");
    });

    it("returns number with property price", function () {
      expect(result.price).to.equal(1200);
    });

    it("returns number with property area", function () {
      expect(result.area).to.equal(520);
    });

    it("returns number with property bedrooms", function () {
      expect(result.bedrooms).to.equal(2);
    });

    it("returns number with property bathrooms", function () {
      expect(result.bathrooms).to.equal(2);
    });
  });

  describe("#filter", function () {
    beforeEach(function () {
      sinon.stub(Property, "findAll").returns({});
    });

    it("passes all filters as parameters to Property.findAll", function () {
      filters = {
        minArea: 100,
        maxArea: 1000,
        bedrooms: 2,
        title: "some title",
      };

      Property.filter(filters);

      const { minArea, maxArea, ...otherFilters } = filters;

      expect(Property.findAll).to.have.been.calledWith({
        where: [
          filters.minArea && { area: { [Op.gt]: filters.minArea } },
          filters.maxArea && { area: { [Op.lt]: filters.maxArea } },
          filters.minPrice && { price: { [Op.gt]: filters.minPrice } },
          filters.maxPrice && { price: { [Op.lt]: filters.maxPrice } },
          otherFilters,
        ],
        include: { all: true },
      });
    });

    it("passes bathrooms as parameter to Property.findAll", function () {
      filters = {
        bathrooms: 1,
      };

      Property.filter(filters);

      expect(Property.findAll).to.have.been.calledWith({
        where: [
          filters.minArea && { area: { [Op.gt]: filters.minArea } },
          filters.maxArea && { area: { [Op.lt]: filters.maxArea } },
          filters.minPrice && { price: { [Op.gt]: filters.minPrice } },
          filters.maxPrice && { price: { [Op.lt]: filters.maxPrice } },
          { bathrooms: filters.bathrooms },
        ],
        include: { all: true },
      });
    });
  });

  describe("#getAgentProperties", function () {
    beforeEach(function () {
      sinon.stub(Property, "findAll").returns({});
    });

    it("passes agentId as parameter to Property.findAll", function () {
      const agentId = 1;

      Property.getAgentProperties(agentId);

      expect(Property.findAll).to.have.been.calledWith({
        where: { agentId: agentId },
        include: { all: true },
      });
    });
  });

  describe("#getOptions", function () {
    afterEach(function () {
      sinon.restore();
    });

    describe("empty options", function () {
      let options;

      beforeEach(async function () {
        sinon.stub(Property, "findAll");

        Property.findAll.resolves(Promise.resolve([]));

        options = await Property.getOptions();
      });

      it("returns empty type options", function () {
        expect(options.type).to.deep.equal([]);
      });

      it("returns empty mode options", function () {
        expect(options.mode).to.deep.equal([]);
      });

      it("returns empty bedrooms options", function () {
        expect(options.bedrooms).to.deep.equal([]);
      });

      it("returns empty bathrooms options", function () {
        expect(options.bathrooms).to.deep.equal([]);
      });

      it("returns empty location options", function () {
        expect(options.location).to.deep.equal([]);
      });
    });

    describe("array of options", function () {
      let options;

      beforeEach(async function () {
        sinon.stub(Property, "findAll");

        Property.findAll.resolves(
          Promise.resolve([
            {
              type: "apartment",
              mode: "sale",
              bedrooms: 2,
              bathrooms: 3,
              location: "Warsaw, Poland",
            },
            {
              type: "apartment",
              mode: "rent",
              bedrooms: 1,
              bathrooms: 2,
              location: "Pasadena, California",
            },
            {
              type: "townhouse",
              mode: "sale",
              bedrooms: 2,
              bathrooms: 2,
              location: "Far, Far Away",
            },
            {
              type: "townhouse",
              mode: "rent",
              bedrooms: 3,
              bathrooms: 4,
              location: "Pasadena, California",
            },
            {
              type: "apartment",
              mode: "sale",
              bedrooms: 12,
              bathrooms: 12,
              location: "Warsaw, Poland",
            },
          ])
        );

        options = await Property.getOptions();
      });

      it("returns array of type options", function () {
        expect(options.type).to.deep.equal(["apartment", "townhouse"]);
      });

      it("returns array of mode options", function () {
        expect(options.mode).to.deep.equal(["rent", "sale"]);
      });

      it("returns array of bedrooms options", function () {
        expect(options.bedrooms).to.deep.equal([1, 2, 3, 12]);
      });

      it("returns array of bathrooms options", function () {
        expect(options.bathrooms).to.deep.equal([2, 3, 4, 12]);
      });

      it("returns array of location options", function () {
        expect(options.location).to.deep.equal([
          "Far, Far Away",
          "Pasadena, California",
          "Warsaw, Poland",
        ]);
      });
    });
  });

  describe("#amenitiesDetail", function () {
    beforeEach(function () {
      sinon.stub(Amenity, "findAll");

      Amenity.findAll.resolves(
        Promise.resolve([
          Amenity.build({ title: "Stove" }),
          Amenity.build({ title: "Refrigerator" }),
          Amenity.build({ title: "Oven" }),
        ])
      );

      const amenity = Amenity.build({ title: "Stove" });

      model.amenities.push(amenity);
    });

    it("returns array of all amenities with availability", async function () {
      const amenities = await model.amenitiesDetail(Amenity);

      expect(amenities).to.deep.equal([
        { title: "Stove", available: true },
        { title: "Refrigerator", available: false },
        { title: "Oven", available: false },
      ]);
    });
  });

  describe("#floorPlansDetail", function () {
    it("returns floorPlans array", function () {
      const floorPlans = model.floorPlansDetail();

      expect(floorPlans).to.deep.equal([
        {
          floorPlanId: 1,
          name: "f_p",
          url: "link",
        },
      ]);
    });
  });

  describe("#featuresDetail", function () {
    it("returns array of features", function () {
      const features = model.featuresDetail();

      expect(features).to.deep.equal([
        {
          feature: "fence",
          title: "Some fence",
        },
        {
          feature: "paw",
          title: "Pets allowed",
        },
        {
          feature: "pool",
          title: "Big pool",
        },
      ]);
    });
  });

  describe("#imagesDetail", function () {
    it("returns images array", function () {
      model.images.push(img);
      model.images.push(img2);

      const images = model.imagesDetail();

      expect(images).to.deep.equal([
        {
          imageId: 1,
          link: "foo",
        },
        {
          imageId: 2,
          link: "bar",
        },
      ]);
    });
  });

  describe("#detailView", function () {
    let result;

    beforeEach(async function () {
      sinon.stub(model, "amenitiesDetail").returns([]);
      sinon.stub(model, "featuresDetail").returns(features);
      sinon.stub(model, "floorPlansDetail").returns();

      result = await model.detailView(Amenity);
    });

    it('returns location string, split by ", "', function () {
      expect(result.location).to.deep.equal(["Warsaw", "Poland"]);
    });

    it("returns agent object", function () {
      expect(result.agent).to.deep.equal(agent);
    });

    it("returns features array ", function () {
      expect(result.features).to.deep.equal(features);
    });
  });
});
