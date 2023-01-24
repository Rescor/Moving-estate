import React from "react";
import { Formik, Field } from "formik";
import { StyledInput } from "../../controls/StyledInput/StyledInput.jsx";
import { Dropdown } from "../../controls/Dropdown/Dropdown.jsx";
import { Menu } from "../Menu/Menu.jsx";
import styles from "./PropertyForm.module.css";

class PropertyForm extends React.Component {
  validateForm(values) {
    const errors = {};

    if (!values.title) {
      errors.title = "Required field";
    }

    if (!values.locationCity) {
      errors.locationCity = "Required field, put city";
    }

    if (!values.locationState) {
      errors.locationState = "Required field, put state";
    }

    if (!values.type) {
      errors.type = "Required field, choose type";
    }

    if (!values.mode) {
      errors.mode = "Required field, choose mode";
    }

    if (!values.price) {
      errors.price = "Please, put the price of the object";
    }

    if (!values.bedrooms) {
      errors.bedrooms = "Please, put the number of bedrooms";
    }

    if (!values.bathrooms) {
      errors.bathrooms = "Please, put the number of bathrooms";
    }

    return errors;
  }

  submitProperty(values, actions) {
    const { onSubmit } = this.props;

    const property = {
      title: values.title,
      location: values.locationCity + ", " + values.locationState,
      description: values.description,
      type: values.type,
      mode: values.mode,
      price: values.price,
      area: values.area,
      bedrooms: values.bedrooms,
      bathrooms: values.bathrooms,
    };

    onSubmit(property);
  }

  render() {
    const { values, onCancel } = this.props;

    return (
      <Formik
        initialValues={values}
        validate={(values) => this.validateForm(values)}
        onSubmit={(values, actions) => this.submitProperty(values, actions)}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className={styles.form}>
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Title: "
              type="text"
              name="title"
              data={props}
            />
            <div className={styles.row}>
              <label className={styles.label} htmlFor={"description"}>
                {" "}
                Description:{" "}
              </label>
              <Field
                as="textarea"
                className={styles.textarea}
                disabled={props.isSubmitting}
                type="text"
                name="description"
                data={props}
              />
            </div>
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Location city: "
              type="text"
              name="locationCity"
              data={props}
            />
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Location state: "
              type="text"
              name="locationState"
              data={props}
            />
            <Dropdown
              isDisabled={props.isSubmitting}
              label="Type"
              name="type"
              types={["apartment", "house"]}
            />
            {props.errors["type"] && (
              <span className={styles.dropdown_error}>
                {props.errors["type"]}
              </span>
            )}
            <Dropdown
              isDisabled={props.isSubmitting}
              label="Mode"
              name="mode"
              types={["rent", "sale"]}
            />
            {props.errors["mode"] && (
              <span className={styles.dropdown_error}>
                {props.errors["mode"]}
              </span>
            )}
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Price: "
              type="number"
              name="price"
              data={props}
            />
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Area: "
              type="number"
              name="area"
              data={props}
            />
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Bedrooms: "
              type="number"
              name="bedrooms"
              data={props}
            />
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Bathrooms: "
              type="number"
              name="bathrooms"
              data={props}
            />
            <Menu
              onCancelClick={onCancel}
              isDisabled={!(props.dirty && props.isValid)}
            />
          </form>
        )}
      </Formik>
    );
  }
}

export { PropertyForm };
