import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { FloorPlanForm } from "../../components/FloorPlanForm/FloorPlanForm.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";

class EditFloorPlan extends BasePage {
  state = {
    propertyId: this.props.match.params.propertyId,
    url: this.props.url,
    name: this.props.name,
    floorPlanId: this.props.match.params.floorPlanId,
  };

  updateFloorPlan = (url, name) => this.updateAction({
    url: `/api/properties/${this.state.propertyId}/floor_plans/${this.state.floorPlanId}`,
    values: { url: url, name: name },
    failureRedirect: `/properties/${this.state.propertyId}`
  })

  render() {
    const { propertyId } = this.state;

    if (this.props.location.aboutProps === undefined) return <Redirect to={`/properties/${propertyId}/floor_plans`} />;

    const { url, name } = this.props.location.aboutProps;

    return <Modal title="Edit floor plan:">
      <FloorPlanForm propertyId={propertyId} url={url} name={name} handleSubmit={this.updateFloorPlan} />
    </Modal>
  }
}

export default withRouter(EditFloorPlan);
