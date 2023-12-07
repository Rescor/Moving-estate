const { expect } = require("chai");
const { PropertyImage } = require("./");

describe("PropertyImage model", function () {
  describe("#simpleView", function () {
    let image;
    let result;

    beforeEach(function () {
      image = PropertyImage.build({
        id: 1,
        link: "url",
        propertyId: "A001",
      });

      result = image.simpleView();
    });

    it("returns imageId", function () {
      expect(result.imageId).to.equal(1);
    });

    it("returns link", function () {
      expect(result.link).to.equal("url");
    });
  });
});
