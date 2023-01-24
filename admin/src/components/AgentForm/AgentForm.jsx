import React from "react";
import { Formik } from "formik";
import { StyledInput } from "../../controls/StyledInput/StyledInput.jsx";
import { Menu } from "../Menu/Menu.jsx";

class AgentForm extends React.Component {
  render() {
    const { values, handleSubmit, handleCancel } = this.props;

    return (
      <Formik
        initialValues={values}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Required field";
          }

          if (!values.email) {
            errors.email = "Required field";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Name: "
              type="text"
              name="name"
              data={props}
            />
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Email: "
              type="email"
              name="email"
              data={props}
            />
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Location: "
              type="text"
              name="location"
              data={props}
            />
            <StyledInput
              isDisabled={props.isSubmitting}
              label="Photo: "
              type="text"
              name="photo"
              data={props}
            />
            <Menu
              onCancelClick={handleCancel}
              isDisabled={!(props.dirty && props.isValid)}
            />
          </form>
        )}
      </Formik>
    );
  }
}

export { AgentForm };
