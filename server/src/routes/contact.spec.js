const { expect } = require("chai");
const sinon = require("sinon");
const nodeMailer = require("nodemailer");
const { Message } = require("../models");
const route = require("./contact.js");

describe("/api/contact", function () {
  let req = {};
  let res = {};
  const { create } = route;
  let transporter;

  describe("POST /", function () {
    beforeEach(function () {
      transporter = {
        sendMail: sinon.stub(),
      };
      sinon.stub(Message, "create");
      sinon.stub(nodeMailer, "createTransport").returns(transporter);

      req.body = {
        clientName: "John Smith",
        clientEmail: "mail@example.com",
        clientMessage: "I am interested",
        agentEmail: "jsmastery2022@gmail.com",
        propertyId: "A001",
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("return 500 when database down", async function () {
      Message.create.throws("Error", "Database down");

      await create(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: "Database down" });
    });

    it("returns 200 and json with thank you message", async function () {
      Message.create.returns({});
      transporter.sendMail.returns({});

      await create(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: "Thank you!" });
    });

    it("returns 404 and error message", async function () {
      Message.create.returns({});
      transporter.sendMail.throws("Error");

      await create(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        error: "Message could not be sent",
      });
    });
  });
});
