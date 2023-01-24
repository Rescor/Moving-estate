import React from "react";
import FeatureItem from "./FeatureItem/FeatureItem.jsx";

class FeaturesList extends React.Component {
  render() {
    const { features, deleteFeature } = this.props;

    return features.map(feature => {
      return <FeatureItem
        feature={feature}
        deleteFeature={deleteFeature}
        key={feature.feature}
      />
    });
  }
}

export { FeaturesList };
