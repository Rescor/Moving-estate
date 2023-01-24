import React from "react";
import { withRouter } from "react-router-dom";
import { ImageForm } from "../../components/ImageForm/ImageForm.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";

class CreateImage extends BasePage {
  state = {
    propertyId: this.props.match.params.propertyId,
  };

  createImage = (imageLink) =>
    this.createAction({
      url: `/api/properties/${this.state.propertyId}/images`,
      values: { link: imageLink },
      redirect: `/properties/${this.state.propertyId}`,
    });

  render() {
    const { propertyId } = this.state;

    return (
      <Modal title="Create a new image:">
        <ImageForm
          propertyId={propertyId}
          link=""
          handleSubmit={this.createImage}
        />
      </Modal>
    );
  }
}

export default withRouter(CreateImage);
