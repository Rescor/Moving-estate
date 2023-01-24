import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import BasePage from "../BasePage.jsx";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";

class DeleteFloorPlan extends BasePage {
  state = {
    redirect: null,
    propertyId: this.props.match.params.propertyId,
    floorPlanId: this.props.match.params.floorPlanId,
    isLoading: false,
  };

  deleteFloorPlan = () =>
    this.deleteAction({
      url: `/api/properties/${this.state.propertyId}/floor_plans/${this.state.floorPlanId}`,
      redirect: `/properties/${this.state.propertyId}/floor_plans`,
    });

  returnToPropertyPage = () => {
    this.setState({
      redirect: `/properties/${this.state.propertyId}/floor_plans`,
    });
  };

  render() {
    const { redirect, isLoading } = this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <Modal title={"Are you sure you want to delete this floor plan?"}>
        <div>
          <MenuButton handleClick={this.deleteFloorPlan} text="Delete" />
          <MenuButton handleClick={this.returnToPropertyPage} text="Cancel" />
        </div>
      </Modal>
    );
  }
}

export default withRouter(DeleteFloorPlan);
