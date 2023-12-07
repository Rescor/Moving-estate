const expect = require("chai").expect;
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const route = require("./amenities.js");
const { Amenity, Property } = require("../models");

chai.use(sinonChai);

describe("/api/amenities", function () {
  let req;
  let res;

  beforeEach(function () {
    req = {};
    res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("POST /", function () {
    const { create } = route;

    beforeEach(function () {
      sinon.stub(Property, "findByPk");
      sinon.stub(Amenity, "findOne");

      Property.findByPk.returns({
        addAmenity: sinon.stub().returns({}),
        detailView: sinon.stub().returns({}),
      });
      Amenity.findOne.returns({ title: "test" });
    });

    it("should returns 200 status and property object ", async function () {
      req.params = { id: 1 };
      req.body = { title: "test" };

      await create(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("should return 403 status if error", async function () {
      req.params = { id: 1 };
      req.body = { title: "test" };

      Property.findByPk.throws("Error", "error");

      await create(req, res);

      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({ error: "error" });
    });
  });

  describe("GET /", function () {
    const { index } = route;

    beforeEach(function () {
      sinon.stub(Property, "findByPk");

      Property.findByPk.returns({
        amenitiesDetail: sinon.stub().returns({}),
      });
    });

    it("should returns 200 status and amenities object", async function () {
      req.params = { id: 1 };

      await index(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ amenities: {} });
    });

    it("should returns 500 status and error", async function () {
      req.params = { id: 100 };

      Property.findByPk.throws("Error", "meow");

      await index(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "meow" });
    });
  });

  describe("DELETE /:amenityTitle", function () {
    const { destroy } = route;

    beforeEach(function () {
      sinon.stub(Property, "findByPk");
      sinon.stub(Amenity, "findOne");

      Property.findByPk.returns({
        removeAmenity: sinon.stub().returns({}),
        detailView: sinon.stub().returns({}),
      });
    });

    it("should returns 200 status and property object", async function () {
      req.params = { id: 1, amenityTitle: "Fridge" };

      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
      expect(Property.findByPk).to.have.been.calledWith(1);
      expect(Amenity.findOne).to.have.been.calledWith({
        where: { title: "Fridge" },
      });
    });

    it("should return 403 status and error", async function () {
      req.params = { id: 100, amenityTitle: "Error" };

      Property.findByPk.throws("Error", "meow");

      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({ error: "meow" });
    });
  });
});
