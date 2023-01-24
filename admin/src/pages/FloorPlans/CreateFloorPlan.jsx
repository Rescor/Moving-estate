import React from "react";
import { withRouter } from "react-router-dom";
import { FloorPlanForm } from "../../components/FloorPlanForm/FloorPlanForm.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";

class CreateFloorPlan extends BasePage {
  state = {
    propertyId: this.props.match.params.propertyId,
  };

  createFloorPlan = (url, name) =>
    this.createAction({
      url: `/api/properties/${this.state.propertyId}/floor_plans`,
      values: { url: url, name: name },
      redirect: `/properties/${this.state.propertyId}`,
    });

  render() {
    const { propertyId } = this.state;

    return (
      <Modal title="Create a new floor plan:">
        <FloorPlanForm
          propertyId={propertyId}
          handleSubmit={this.createFloorPlan}
        />
      </Modal>
    );
  }
}

export default withRouter(CreateFloorPlan);
