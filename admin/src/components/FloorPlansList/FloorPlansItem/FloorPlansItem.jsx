import React from "react";
import { withRouter } from "react-router-dom";
import { ListItemLinks } from "../../ListItemLinks/ListItemLinks.jsx";
import styles from "./FloorPlansItem.module.css";

class FloorPlansItem extends React.Component {
  state = {
    propertyId: this.props.match.params.propertyId,
  };

  render() {
    const { floorPlan } = this.props;
    const { propertyId } = this.state;

    return (
      <div className={styles.wrapper}>
        <img src={floorPlan.url} className={styles.image} alt="" />
        <p>{floorPlan.name}</p>
        <ListItemLinks
          editPath={`/properties/${propertyId}/floor_plans/${floorPlan.floorPlanId}/edit`}
          deletePath={`/properties/${propertyId}/floor_plans/${floorPlan.floorPlanId}/delete`}
          aboutProps={{ name: floorPlan.name, url: floorPlan.url }}
        />
      </div>
    );
  }
}

export default withRouter(FloorPlansItem);
