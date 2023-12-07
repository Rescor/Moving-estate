const expect = require("chai").expect;
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const route = require("./agents.js");
const { Agent, Property } = require("../models");

chai.use(sinonChai);

describe("/api/agents", function () {
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

  describe("get/ , about function index", function () {
    const { index } = route;

    beforeEach(function () {
      sinon.stub(Agent, "findAll");
    });

    it("Finds and returns all agents ", async function () {
      Agent.findAll.returns([1, 2]);

      await index(req, res);

      expect(res.json).to.have.been.calledWith({
        agents: [1, 2],
      });
    });

    it("response with 500 and error message if smth wrong", async function () {
      Agent.findAll.throws("Error", "staff broke");

      await index(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "staff broke" });
    });
  });

  describe("GET /:id", function () {
    const { read } = route;

    beforeEach(function () {
      sinon.stub(Agent, "findByPk");

      Agent.findByPk.withArgs(42).returns({ id: 42 });
      Agent.findByPk.withArgs(30).returns(null);
      Agent.findByPk.withArgs(1).throws("Error", "custom message");
    });

    it("returns status 500 and error message", async function () {
      req.params = { id: 1 };

      await read(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "custom message" });
    });

    it("returns 404 if agents not found", async function () {
      req.params = { id: 30 };

      await read(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ agent: {} });
    });

    it("returns agent object", async function () {
      req.params = { id: 42 };

      await read(req, res);

      expect(Agent.findByPk).to.have.been.calledWith(42);
      expect(res.json).to.have.been.calledWith({
        agent: { id: 42 },
      });
    });
  });

  describe("POST /", function () {
    const { create } = route;

    beforeEach(function () {
      sinon.stub(Agent, "create");

      req.body = {};
    });

    it("returns status 200 and agent object", async function () {
      Agent.create.returns({});

      req.body = {
        name: "John",
        location: "Warsaw, Poland",
        email: "email@example.com",
        photo: "",
      };

      await create(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ agent: {} });
      expect(Agent.create).to.have.been.calledWith(req.body);
    });

    it("returns status 500 and error message", async function () {
      Agent.create.throws("Error", "Custom message");

      await create(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Custom message" });
    });
  });

  describe("PUT /:id", function () {
    const { update } = route;
    let agent;

    beforeEach(function () {
      agent = {
        update: sinon.stub(),
      };

      sinon.stub(Agent, "findByPk");

      Agent.findByPk.withArgs(1).throws("Error", "throw 500");
      Agent.findByPk.withArgs(42).returns(agent);

      req.body = {
        name: "test",
        location: "test",
        email: "em@example.com",
        photo: "url",
      };
    });

    it("returns 500 and error message", async function () {
      req.params = { id: 1 };

      await update(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(Agent.findByPk).to.have.been.calledWith(1);
      expect(res.json).to.have.been.calledWith({ error: "throw 500" });
    });

    it("returns status 200 and agent object", async function () {
      req.params = { id: 42 };

      await update(req, res);

      expect(res.json).to.have.been.calledWith({ agent });
      expect(Agent.findByPk).to.have.been.calledWith(42);
      expect(agent.update).to.have.been.calledWith(req.body);
    });

    it("returns 403 and error message", async function () {
      agent.update.throws("Error", "throw 403 status");

      req.params = { id: 42 };

      await update(req, res);

      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({ error: "throw 403 status" });
      expect(Agent.findByPk).to.have.been.calledWith(42);
      expect(agent.update).to.have.been.calledWith(req.body);
    });
  });

  describe("DELETE /:id", function () {
    const { destroy } = route;
    const agent = {
      destroy: sinon.stub().returns({}),
    };

    beforeEach(function () {
      sinon.stub(Agent, "findByPk");

      Agent.findByPk.withArgs(1).returns(agent);
      Agent.findByPk.withArgs(2).returns(null);
      Agent.findByPk.withArgs(3).throws("Error", "custom message");

      sinon.stub(Property, "update").withArgs(1, 2).returns({});

      req.body = { newAgentId: 2 };
    });

    it("reassigns properties to new agent", async function () {
      req.params = { id: 1 };

      await destroy(req, res);

      expect(Property.update).to.have.been.calledWith(
        { agentId: 2 },
        {
          where: {
            agentId: 1,
          },
        }
      );
    });

    it("returns status 500 and error message", async function () {
      req.params = { id: 3 };

      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "custom message" });
      expect(Agent.findByPk).to.have.been.calledWith(3);
    });

    it("returns 404 and no agent message", async function () {
      req.params = { id: 2 };

      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        error: "Agent with id = 2 doesn't exist",
      });
      expect(Agent.findByPk).to.have.been.calledWith(2);
    });

    it("returns agent object", async function () {
      req.params = { id: 1 };

      await destroy(req, res);

      expect(res.json).to.have.been.calledWith({});
    });

    it("returns 403", async function () {
      agent.destroy.throws("Error", "destroy error custom message");

      req.params = { id: 1 };

      await destroy(req, res);

      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({
        error: "destroy error custom message",
      });
      expect(Agent.findByPk).to.have.been.calledWith(1);
    });
  });
});
