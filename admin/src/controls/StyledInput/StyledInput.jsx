import React from "react";
import { Input } from "@mui/material";
import styles from "./StyledInput.module.css";

class StyledInput extends React.Component {
  render() {
    const { label, name, type, data, isDisabled } = this.props;

    return <div className={styles.input_container}>
      <div className={styles.input_wrapper}>
        <span className={styles.label}>{label}</span>
        <Input
          type={type}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          value={data.values[name]}
          name={name}
          className={styles.input}
          disabled={isDisabled}
        />
      </div>
      {data.errors[name] && <span className={styles.input_error}>{data.errors[name]}</span>}
    </div>
  }
}

export { StyledInput };
