import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import BasePage from "../BasePage.jsx";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";

class DeleteFeature extends BasePage {
  state = {
    redirect: null,
    propertyId: this.props.match.params.propertyId,
    icon: this.props.match.params.icon,
    isLoading: false,
  };

  deleteFeature = () =>
    this.deleteAction({
      url: `/api/properties/${this.state.propertyId}/features/${this.state.icon}`,
      redirect: `/properties/${this.state.propertyId}/features`,
    });

  returnToPropertyPage = () => {
    this.setState({
      redirect: `/properties/${this.state.propertyId}/features`,
    });
  };

  render() {
    const { redirect, isLoading } = this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <Modal title={"Are you sure you want to delete this feature?"}>
        <div>
          <MenuButton handleClick={this.deleteFeature} text="Delete" />
          <MenuButton handleClick={this.returnToPropertyPage} text="Cancel" />
        </div>
      </Modal>
    );
  }
}

export default withRouter(DeleteFeature);
