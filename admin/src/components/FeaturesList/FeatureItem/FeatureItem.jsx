import React from "react";
import { withRouter } from "react-router-dom";
import { ReactComponent as PawIcon } from "./assets/paw.svg";
import { ReactComponent as PoolIcon } from "./assets/pool.svg";
import { ReactComponent as FenceIcon } from "./assets/fence.svg";
import { ListItemLinks } from "../../ListItemLinks/ListItemLinks.jsx";
import styles from "./FeatureItem.module.css";

class FeaturesItem extends React.Component {
  state = {
    propertyId: this.props.match.params.propertyId,
  };

  icon() {
    switch (this.props.feature.feature) {
      case "paw":
        return <PawIcon className={styles.feature_component} />;
      case "pool":
        return <PoolIcon className={styles.feature_component} />;
      case "fence":
        return <FenceIcon className={styles.feature_component} />;
      default:
        return null;
    }
  }

  render() {
    const { feature } = this.props;
    const { propertyId } = this.state;

    return (
      <div className={styles.wrapper}>
        {this.icon()}
        <p>{feature.title}</p>
        <ListItemLinks
          editPath={`/properties/${propertyId}/features/${feature.feature}/edit`}
          deletePath={`/properties/${propertyId}/features/${feature.feature}/delete`}
          aboutProps={{ feature: feature }}
        />
      </div>
    );
  }
}

export default withRouter(FeaturesItem);
