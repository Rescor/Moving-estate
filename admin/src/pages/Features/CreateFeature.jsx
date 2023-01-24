import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { FeatureForm } from "../../components/FeatureForm/FeatureForm.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";

class CreateFeature extends BasePage {
  state = {
    features: [],
    propertyId: this.props.match.params.propertyId,
    redirect: null,
  };

  createFeature = (feature, title) =>
    this.createAction({
      url: `/api/properties/${this.state.propertyId}/features`,
      values: { icon: feature, title: title },
      redirect: `/properties/${this.state.propertyId}`,
    });

  async getFeatures() {
    const { propertyId } = this.state;

    return await fetch(`/api/properties/${propertyId}/features`)
      .then((res) => res.json())
      .then(({ features }) => this.setState({ features: features }))
      .catch(() => this.setState({ redirect: `/properties/${propertyId}` }));
  }

  componentDidMount() {
    this.getFeatures();
  }

  render() {
    const { propertyId, features, redirect } = this.state;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <Modal title="Create a new feature:">
        <FeatureForm
          features={features}
          propertyId={propertyId}
          icon=""
          title=""
          handleSubmit={this.createFeature}
        />
      </Modal>
    );
  }
}

export default withRouter(CreateFeature);
