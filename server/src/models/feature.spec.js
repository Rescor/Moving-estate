const { expect } = require("chai");
const { Property } = require("./");

describe("Feature model", function () {
  let property;

  beforeEach(function () {
    const features = [
      {
        icon: "fence",
        noise: "remove",
        PropertyFeature: {
          title: "Some fence",
        },
      },
    ];

    property = Property.build(
      {
        features: features,
      },
      { include: "features" }
    );
  });

  describe("#simpleView", function () {
    let result;

    beforeEach(function () {
      result = property.features[0].simpleView();
    });

    it("should return a feature object", function () {
      expect(result.feature).to.equal("fence");
      expect(result.title).to.equal("Some fence");
    });
  });
});
