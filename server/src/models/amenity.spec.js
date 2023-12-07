const { expect } = require("chai");
const { Amenity } = require("./");

describe("Amenity model", function () {
  let amenity;
  let result;

  beforeEach(() => {
    amenity = Amenity.build({ title: "Some new amenity" });
    result = amenity.simpleView();
  });

  describe("#simpleView", function () {
    it("returns amenity title", function () {
      expect(result.title).to.equal("Some new amenity");
    });
  });
});
