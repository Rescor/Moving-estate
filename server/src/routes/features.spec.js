const sinon = require("sinon");
const { expect } = require("chai");
const route = require("./features.js");
const { Property, Feature } = require("../models");

describe("/api/properties/:id/features", function () {
  let req = {};
  let res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("GET /", function () {
    const { index } = route;

    beforeEach(function () {
      req.params = { id: "A001" };

      sinon.stub(Property, "findByPk");
    });

    it("returns status 200 and features object", async function () {
      Property.findByPk.returns({ featuresDetail: sinon.stub().returns([]) });

      await index(req, res);

      expect(Property.findByPk).to.have.been.calledWith("A001");
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ features: [] });
    });

    it("returns status 500 and error message", async function () {
      Property.findByPk.throws("Error", "Database error");

      await index(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database error" });
    });
  });

  describe("POST /", function () {
    const { create } = route;
    let property;

    beforeEach(function () {
      req = {
        params: { id: "A001" },
        body: { icon: "pool", title: "Some title" },
      };

      property = {
        hasFeature: sinon.stub(),
        addFeature: sinon.stub().returns({}),
        detailView: sinon.stub().returns({}),
      };

      sinon.stub(Property, "findByPk").returns(property);
      sinon.stub(Feature, "findOne").returns({});
    });

    it("returns 200 status and updated property object", async function () {
      property.hasFeature.returns(false);

      await create(req, res);

      expect(Property.findByPk).to.have.been.calledWith("A001");
      expect(Feature.findOne).to.have.been.calledWith({
        where: { icon: "pool" },
      });
      expect(property.hasFeature).to.have.been.calledWith({});
      expect(property.addFeature).to.have.been.calledWith(
        {},
        { through: { title: "Some title" } }
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns 403 status and error message", async function () {
      property.hasFeature.returns(true);

      await create(req, res);

      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({
        error: "Feature icon already used",
      });
    });

    it("returns 500 status and error message", async function () {
      Property.findByPk.throws("Error", "Database down");

      await create(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database down" });
    });
  });

  describe("PUT /:icon", function () {
    const { update } = route;

    beforeEach(function () {
      req = {
        params: { id: "A002", icon: "paw" },
        body: { title: "New title" },
      };

      property = {
        addFeature: sinon.stub().returns({}),
        detailView: sinon.stub().returns({}),
      };

      sinon.stub(Property, "findByPk").returns(property);
      sinon.stub(Feature, "findOne").returns({});
    });

    it("returns status 200 and updated property object", async function () {
      await update(req, res);

      expect(Property.findByPk).to.have.been.calledWith("A002");
      expect(Feature.findOne).to.have.been.calledWith({
        where: { icon: "paw" },
      });
      expect(property.addFeature).to.have.been.calledWith(
        {},
        { through: { title: "New title" } }
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns status 500 and error message", async function () {
      Property.findByPk.throws("Error", "Database down");

      await update(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database down" });
    });
  });

  describe("DELETE /:icon", function () {
    const { destroy } = route;

    beforeEach(function () {
      req.params = { id: "A003", icon: "pool" };

      property = {
        removeFeature: sinon.stub().returns({}),
        detailView: sinon.stub().returns({}),
      };

      sinon.stub(Property, "findByPk").returns(property);
      sinon.stub(Feature, "findOne").returns({});
    });

    it("returns status 200 and updated property object", async function () {
      await destroy(req, res);

      expect(Property.findByPk).to.have.been.calledWith("A003");
      expect(Feature.findOne).to.have.been.calledWith({
        where: { icon: "pool" },
      });
      expect(property.removeFeature).to.have.been.calledWith({});
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns status and error message", async function () {
      Property.findByPk.throws("Error", "Database down");

      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database down" });
    });
  });
});
