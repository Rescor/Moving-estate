const { expect } = require("chai");
const { FloorPlan } = require("./");

describe("FloorPlan model", function () {
  describe("#simpleView", function () {
    let floorPlan;
    let result;

    beforeEach(function () {
      floorPlan = FloorPlan.build({
        id: 1,
        name: "Ground Floor",
        url: "link",
        propertyId: "A001",
      });

      result = floorPlan.simpleView();
    });

    it("returns floorPlanId", function () {
      expect(result.floorPlanId).to.equal(1);
    });

    it("returns name", function () {
      expect(result.name).to.equal("Ground Floor");
    });

    it("returns url", function () {
      expect(result.url).to.equal("link");
    });
  });
});
