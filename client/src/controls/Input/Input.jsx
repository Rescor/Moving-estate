import React from "react";
import styles from "./Input.module.css";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || "",
    };
  }

  handleInputBlur = (inputText) => {
    this.props.onChange(inputText.target.value);
  };

  componentDidUpdate(prevprops, _) {
    if (prevprops.value === this.props.value) return;

    this.setState({
      value: this.props.value,
    });
  }

  className() {
    const classes = [styles.input_field];
    this.props.width === "half" && classes.push(styles.input_field_half);
    this.props.required === true && classes.push(styles.input_field_agent);
    return classes.join(" ");
  }

  render() {
    const { type, placeholder } = this.props;
    return (
      (type === undefined ||
        type === "text" ||
        type === "email" ||
        type === "number") && (
        <input
          className={this.className()}
          type={type || "text"}
          placeholder={placeholder}
          defaultValue={this.state.value}
          onBlur={this.handleInputBlur}
          minLength={this.props.minlength}
          maxLength={this.props.maxlength}
          pattern={this.props.pattern}
        />
      )
    );
  }
}

export { Input };
