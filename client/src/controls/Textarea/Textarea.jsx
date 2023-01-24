import React from "react";
import styles from "./Textarea.module.css";

class Textarea extends React.Component {
  state = {
    textAreaValue: "",
  };

  handleTextareaChange = (inputTextarea) => {
    this.props.onChange(inputTextarea.target.value);
  };

  componentDidUpdate(prevProps, _) {
    if (prevProps.textAreaValue === this.props.textAreaValue) return;

    this.setState({
      textAreaValue: this.props.textAreaValue,
    });
  }

  className() {
    const classes = [styles.textarea];
    this.props.required === true && classes.push(styles.textarea_agent);
    return classes.join(" ");
  }

  render() {
    const { placeholder } = this.props;
    return (
      <textarea
        className={this.className()}
        rows={8}
        type="text"
        placeholder={placeholder}
        defaultValue={this.state.textAreaValue}
        onChange={this.handleTextareaChange}
        maxLength={this.props.maxlength}
      />
    );
  }
}

export { Textarea };
