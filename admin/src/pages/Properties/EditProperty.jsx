import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { PropertyForm } from "../../components/PropertyForm/PropertyForm.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";

class EditProperty extends BasePage {
  state = {
    redirect: null,
    isLoading: true,
    propertyId: this.props.match.params.propertyId,
    property: {},
  };

  async getProperty() {
    const { propertyId } = this.state;

    await fetch(`/api/properties/${propertyId}`)
      .then((res) => res.json())
      .then((body) => {
        const property = {
          id: body.id,
          title: body.title,
          description: body.description,
          locationCity: body.location[0],
          locationState: body.location[1],
          type: body.type,
          mode: body.mode,
          price: body.price,
          area: body.area,
          bedrooms: body.bedrooms,
          bathrooms: body.bathrooms,
        };

        this.setState({
          property: property,
          isLoading: false,
        });
      })
      .catch(() =>
        this.setState({ redirect: "/properties", isLoading: false })
      );
  }

  updateProperty = (property) =>
    this.updateAction({
      url: `/api/properties/${this.state.propertyId}`,
      values: property,
      successRedirect: `/properties/${this.state.propertyId}`,
      failureRedirect: `/properties/${this.state.propertyId}`,
    });

  componentDidMount() {
    this.getProperty();
  }

  returnToPropertyPage = () => {
    this.setState({ redirect: `/properties/${this.state.propertyId}` });
  };

  render() {
    const { redirect, property, isLoading } = this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <Modal title={`Edit property: ${property.id}`}>
        <PropertyForm
          values={property}
          onSubmit={this.updateProperty}
          onCancel={this.returnToPropertyPage}
        />
      </Modal>
    );
  }
}

export default withRouter(EditProperty);
