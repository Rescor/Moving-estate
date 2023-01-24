import React from "react";
import { Redirect } from "react-router-dom";
import { PropertyForm } from "../../components/PropertyForm/PropertyForm.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";

class CreateProperty extends BasePage {
  state = {
    redirect: null,
    isLoading: false,
    property: {
      title: "",
      description: "",
      locationCity: "",
      locationState: "",
      type: "",
      mode: "",
      price: "",
      area: "",
      bedrooms: "",
      bathrooms: ""
    }
  };

  isLoggedIn() {
    this.setState({ isLoading: true });

    fetch("/api/auth/current_user")
      .then(res => {
        if (res.status === 401) {
          this.setState({
            isLoading: false,
            redirect: "/"
          });
          return null;
        }
      })
  }

  createProperty = property => this.createAction({
    url: "/api/properties",
    values: property,
    successObject: "property",
    redirect: "/properties"
  })

  returnToProperties = () => {
    this.setState({ redirect: "/properties" });
  }

  render() {
    const { redirect, property, isLoading } = this.state;

    if (isLoading) return <Spinner />

    if (redirect) return <Redirect to={redirect} />

    return <Modal title="Create a new property:">
      <PropertyForm
        values={property}
        onSubmit={this.createProperty}
        onCancel={this.returnToProperties}
      />
    </Modal>
  }
}

export { CreateProperty };
