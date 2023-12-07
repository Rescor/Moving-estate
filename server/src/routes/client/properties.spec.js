const expect = require("chai").expect;
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const route = require("./properties.js");
const { Property } = require("../../models");

chai.use(sinonChai);

describe("api/client/properties", function () {
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

  describe("GET /:id", function () {
    const { read } = route;

    beforeEach(function () {
      sinon.stub(Property, "findByPk");
    });

    it("returns property object", async function () {
      Property.findByPk.withArgs("T001").returns({
        id: "T001",
        detailView: sinon.stub().returns({}),
      });

      req.params = { id: "T001" };

      await read(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(Property.findByPk).to.have.been.calledWith("T001");
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns 404 if property not found", async function () {
      Property.findByPk.throws("Error");

      req.params = { id: "T100" };

      await read(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(Property.findByPk).to.have.been.calledWith("T100");
      expect(res.json).to.have.been.calledWith({
        error: "Property with id T100 not found",
      });
    });
  });

  describe("GET /", function () {
    const { index } = route;

    beforeEach(function () {
      req.query = { mode: "rent", type: "apartment", page: 1 };

      sinon.stub(Property, "getOptions");

      Property.getOptions.returns([]);

      sinon.stub(Property, "filter");

      Property.filter.returns([]);
    });

    it("checks if values passed for filtering are correct", async function () {
      await index(req, res);

      expect(Property.filter).to.have.been.calledWith({
        mode: "rent",
        type: "apartment",
      });
    });

    it("returns 200 and json with empty properties", async function () {
      await index(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        properties: [],
        options: [],
        pages: 0,
      });
    });

    it("returns 200 and json with filtered properties", async function () {
      Property.filter.returns([
        {
          summaryView: sinon.stub().returns({ id: 1 }),
        },
        {
          summaryView: sinon.stub().returns({ id: 2 }),
        },
      ]);

      await index(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        properties: [{ id: 1 }, { id: 2 }],
        options: [],
        pages: 1,
      });
    });

    it("returns 500 and json with empty properties", async function () {
      Property.filter.throws("Error");

      await index(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({
        options: [],
        properties: [],
        pages: 0,
      });
    });
  });
});
