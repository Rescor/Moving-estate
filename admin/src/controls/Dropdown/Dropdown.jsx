import React from "react";
import { Field } from "formik";
import styles from "./Dropdown.module.css";

class Dropdown extends React.Component {
  render() {
    const { isDisabled, label, name, types } = this.props;

    return <div className={styles.dropdown_container}>
      <label className={styles.label} htmlFor={label}>{`${label}: `}</label>
      <Field as="select" className={styles.dropdown} disabled={isDisabled} name={name}>
        <option defaultValue="" disabled hidden></option>
        {types.map(type => {
          return <option value={type} key={type}>{type}</option>
        })}
      </Field>
    </div>
  }
}

export { Dropdown };
