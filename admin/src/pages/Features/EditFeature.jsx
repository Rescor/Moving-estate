import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { FeatureForm } from "../../components/FeatureForm/FeatureForm.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";

class EditFeature extends BasePage {
  state = {
    propertyId: this.props.match.params.propertyId,
    features: [],
    icon: this.props.icon,
    title: this.props.title,
    redirect: null,
  };

  updateFeature = (icon, title) =>
    this.updateAction({
      url: `/api/properties/${this.state.propertyId}/features/${icon}`,
      values: { title: title },
      failureRedirect: `/properties/${this.state.propertyId}`,
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

    if (this.props.location.aboutProps === undefined)
      return <Redirect to={`/properties/${propertyId}/features`} />;

    if (redirect) return <Redirect to={redirect} />;

    const { feature, title } = this.props.location.aboutProps.feature;

    return (
      <Modal title="Edit feature:">
        <FeatureForm
          editMode
          features={features}
          propertyId={propertyId}
          icon={feature}
          title={title}
          handleSubmit={this.updateFeature}
        />
      </Modal>
    );
  }
}

export default withRouter(EditFeature);
