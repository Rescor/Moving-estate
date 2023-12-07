const sinon = require("sinon");
const { expect } = require("chai");
const route = require("./images.js");
const { Property, PropertyImage } = require("../models");

describe("/api/properties/:id/images", function () {
  let req = {};
  let res = {};
  let property;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    property = {
      imagesDetail: sinon.stub().returns([]),
      detailView: sinon.stub().returns({}),
    };

    image = {
      update: sinon.stub().returns({}),
      destroy: sinon.stub().returns({}),
    };

    sinon.stub(Property, "findByPk").returns(property);
    sinon.stub(PropertyImage, "findByPk").returns(image);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("GET /", function () {
    const { index } = route;

    beforeEach(function () {
      req.params = { id: "A001" };
    });

    it("returns status 200 and images", async function () {
      await index(req, res);

      expect(Property.findByPk).to.have.been.calledWith("A001");
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ images: [] });
    });

    it("returns status 500 and error message", async function () {
      Property.findByPk.throws("Error", "Database down");

      await index(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database down" });
    });
  });

  describe("POST /", function () {
    const { create } = route;

    beforeEach(function () {
      req = {
        params: { id: "A002" },
        body: { link: "some_url" },
      };

      sinon.stub(PropertyImage, "create").returns({});
    });

    it("returns status 200 and updated property", async function () {
      await create(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns status 500 and error message", async function () {
      PropertyImage.create.throws("Error", "Unable to create");

      await create(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Unable to create" });
    });
  });

  describe("PUT /:imageId", function () {
    const { update } = route;

    beforeEach(function () {
      req = {
        params: {
          id: "A001",
          imageId: 1,
        },
        body: { link: "url" },
      };
    });

    it("returns status 200 and updated property", async function () {
      await update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns status 500 and error message", async function () {
      PropertyImage.findByPk.throws("Error", "Database error");

      await update(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database error" });
    });
  });

  describe("DELETE /:imageId", function () {
    const { destroy } = route;

    beforeEach(function () {
      req = {
        params: {
          id: "A002",
          imageId: 2,
        },
      };
    });

    it("returns status 200 and updated property", async function () {
      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("returns status 500 and error message", async function () {
      PropertyImage.findByPk.throws("Error", "Database error");

      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database error" });
    });
  });
});
