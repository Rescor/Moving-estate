const sinon = require("sinon");
const { expect } = require("chai");
const route = require("./floor_plans.js");
const { Property, FloorPlan } = require("../models");

describe("/api/properties/:id/floor_plans", function () {
  let req = {};
  let res = {};
  let floorPlan = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    let property = {
      floorPlansDetail: sinon.stub().returns([]),
      detailView: sinon.stub().returns({}),
    };

    floorPlan = {
      update: sinon.stub(),
      destroy: sinon.stub(),
    };

    sinon.stub(Property, "findByPk").returns(property);
    sinon.stub(FloorPlan, "create").returns({});
    sinon.stub(FloorPlan, "findByPk").returns(floorPlan);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("GET /", function () {
    const { index } = route;

    beforeEach(() => {
      req.params = { id: "A001" };
    });

    it("returns status 200 and floorPlans", async function () {
      await index(req, res);

      expect(Property.findByPk).to.have.been.calledWith("A001");
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ floorPlans: [] });
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

    beforeEach(function () {
      req = {
        params: { id: "A002" },
        body: {
          name: "Ground Floor",
          url: "link",
        },
      };
    });

    it("returns status 200 and updated property", async function () {
      await create(req, res);

      expect(FloorPlan.create).to.have.been.calledWith({
        ...req.body,
        propertyId: "A002",
      });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns status 500 and error message", async function () {
      FloorPlan.create.throws("Error", "Database error");
      await create(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database error" });
    });
  });

  describe("PUT /:floorPlanId", function () {
    const { update } = route;

    beforeEach(function () {
      req = {
        params: {
          id: "A002",
          floorPlanId: 1,
        },
        body: {
          name: "Ground Floor",
          url: "new_link",
        },
      };
    });

    it("returns status 200 and updated property", async function () {
      await update(req, res);

      expect(FloorPlan.findByPk).to.have.been.calledWith(1);
      expect(floorPlan.update).to.have.been.calledWith({ ...req.body });
      expect(Property.findByPk).to.have.been.calledWith("A002");
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns status 500 and error message", async function () {
      FloorPlan.findByPk.throws("Error", "Database error");

      await update(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database error" });
    });
  });

  describe("DELETE /:floorPlanId", function () {
    const { destroy } = route;

    beforeEach(function () {
      req = {
        params: {
          id: "A003",
          floorPlanId: 2,
        },
      };
    });

    it("returns status 200 and updated property", async function () {
      await destroy(req, res);

      expect(FloorPlan.findByPk).to.have.been.calledWith(2);
      expect(Property.findByPk).to.have.been.calledWith("A003");
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns status 500 and error message", async function () {
      FloorPlan.findByPk.throws("Error", "Database error");

      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database error" });
    });
  });
});
