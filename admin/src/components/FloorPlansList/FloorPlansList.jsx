import React from "react";
import FloorPlansItem from "./FloorPlansItem/FloorPlansItem.jsx";

class FloorPlansList extends React.Component {
  render() {
    const { floorPlans, deleteFloorPlan } = this.props;

    return floorPlans.map(floorPlan => <FloorPlansItem floorPlan={floorPlan} deleteFloorPlan={deleteFloorPlan} key={floorPlan.floorPlanId} />);
  }
}

export { FloorPlansList };
