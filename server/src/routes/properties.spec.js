const expect = require("chai").expect;
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const route = require("./properties.js");
const { Message, Property, Agent } = require("../models");

chai.use(sinonChai);

describe("/api/properties", function () {
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

  describe("GET /id", function () {
    const { read } = route;

    beforeEach(function () {
      sinon.stub(Property, "findByPk");

      Property.findByPk
        .withArgs(1)
        .returns({ id: 1, summaryView: sinon.stub().returns({}) });
      Property.findByPk.withArgs(100).throws("Error");
    });

    it("return property object", async function () {
      req.params = { id: 1 };

      await read(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(Property.findByPk).to.have.been.calledWith(1);
      expect(res.json).to.have.been.calledWith({});
    });

    it("return 404 if property not found", async function () {
      req.params = { id: 100 };

      await read(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(Property.findByPk).to.have.been.calledWith(100);
      expect(res.json).to.have.been.calledWith({
        error: "Property with id 100 not found",
      });
    });
  });

  describe("GET /", function () {
    const { index } = route;

    beforeEach(function () {
      sinon.stub(Agent, "findOne");

      Agent.findOne
        .withArgs({ where: { email: "e@mail.com" } })
        .returns({ id: 1, name: "Horus" });

      Agent.findOne
        .withArgs({ where: { email: "error@mail.com" } })
        .throws("Error", "error");

      sinon.stub(Property, "getAgentProperties");

      Property.getAgentProperties.returns([]);
    });

    it("should return properties array and agent name", async function () {
      req.query = { email: "e@mail.com" };

      await index(req, res);

      expect(res.json).to.have.been.calledWith({
        properties: [],
        agentName: "Horus",
      });

      expect(Agent.findOne).to.have.been.calledWith({
        where: { email: "e@mail.com" },
      });

      expect(Property.getAgentProperties).to.have.been.calledWith(1);
    });

    it("should return an 404 error", async function () {
      req.query = { email: "error@mail.com" };

      await index(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Agent with email: error@mail.com does not exist",
      });
    });
  });

  describe("POST /", function () {
    const { create } = route;

    beforeEach(function () {
      sinon.stub(Property, "create");

      req.body = {};

      sinon.stub(Agent, "findOne");

      Agent.findOne.returns({ id: 1 });
    });

    it("should return 404 status if agent not found", async function () {
      Agent.findOne.returns(null);

      await create(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ error: "Agent not found" });
    });

    it("should return 200 status and property object", async function () {
      Property.create.returns({ summaryView: sinon.stub().returns({}) });

      await create(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("should return 403 status and error message", async function () {
      Property.create.throws("Error", "meow");

      await create(req, res);

      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({ error: "meow" });
    });
  });

  describe("PUT /:id", function () {
    const { update } = route;
    let property;

    beforeEach(function () {
      property = {
        update: sinon.stub(),
        detailView: sinon.stub().returns({ title: "update" }),
      };

      req.body = {};

      sinon.stub(Property, "findByPk");

      Property.findByPk.withArgs(10).returns(property);
    });

    it("should return 404 status if property not found", async function () {
      req.params = { id: 101 };

      await update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        error: `Property with id = 101 doesn't exist`,
      });
    });

    it("should return 200 status and update property object", async function () {
      req.params = { id: 10 };

      await update(req, res);

      expect(property.update).to.have.been.calledWith({});
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        property: { title: "update" },
      });
    });

    it("should return 403 status and error message", async function () {
      property.update.throws("Error", "meow");
      req.params = { id: 10 };

      await update(req, res);

      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({ error: "meow" });
    });
  });

  describe("DELETE / :id", function () {
    const { destroy } = route;
    let property;

    beforeEach(function () {
      property = {
        destroy: sinon.stub().returns({ dest: "dest" }),
      };

      sinon.stub(Property, "findByPk");

      Property.findByPk.withArgs(1).returns(property);
      Property.findByPk.withArgs(1000).throws("Error", "error destroy");
    });

    it("returns destroyed object", async function () {
      req.params = { id: 1 };

      await destroy(req, res);

      expect(Property.findByPk).to.have.been.calledWith(1);
      expect(res.json).to.have.been.calledWith({ dest: "dest" });
    });

    it("returns 403 if no such property with id", async function () {
      req.params = { id: 1000 };

      await destroy(req, res);

      expect(Property.findByPk).to.have.been.calledWith(1000);
      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({ error: "error destroy" });
    });
  });

  describe("GET /messages/:id", function () {
    const { retrieve } = route;

    beforeEach(function () {
      sinon.stub(Agent, "findOne");

      Agent.findOne.returns(null);

      sinon.stub(Message, "findAll").returns([]);
    });

    it("returns 401 if no such agent (include no access)", async function () {
      req.params = { id: 3 };
      req.query = { email: "agent" };

      await retrieve(req, res);

      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ error: "no access" });
    });

    it("returns messages", async function () {
      Agent.findOne
        .withArgs({
          where: { email: "agent" },
          include: { model: Property, where: { id: 1 } },
        })
        .returns({});

      req.params = { id: 1 };
      req.query = { email: "agent" };

      await retrieve(req, res);

      expect(Agent.findOne).to.have.been.calledWith({
        where: { email: "agent" },
        include: { model: Property, where: { id: 1 } },
      });
      expect(Message.findAll).to.have.been.calledWith({
        where: { propertyId: 1 },
      });
      expect(res.json).to.have.been.calledWith([]);
    });
  });
});
