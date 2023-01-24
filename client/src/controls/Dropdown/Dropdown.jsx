import React from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: this.props.value || null,
    };
  }

  handleChange = (selectedOption) => {
    let value = null;
    if (selectedOption) value = selectedOption.value;
    this.setState({ selectedOption: value });
    this.props.onChange(value);
  };

  componentDidUpdate(prevprops, _) {
    if (prevprops.value === this.props.value) return;
    this.setState({ selectedOption: this.props.value });
  }

  className() {
    const classes = [styles.select];
    this.props.width === "half" && classes.push(styles.select_half);
    return classes.join(" ");
  }

  render() {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: "2px solid #df434a",
        color: state.isSelected ? "#484848" : "black",
        backgroundColor: state.isSelected ? "#df434a" : "#F0F0F0",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#D8D8D8",
        },
      }),
      control: (provided) => ({
        ...provided,
        backgroundColor: "#F5F5F5",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#D8D8D8",
        },
      }),
    };

    const { options, placeholder } = this.props;

    return (
      <Select
        onChange={this.handleChange}
        options={options}
        styles={customStyles}
        className={this.className()}
        placeholder={placeholder}
        isClearable
        value={
          this.state.selectedOption
            ? {
                value: this.state.selectedOption,
                label: this.state.selectedOption,
              }
            : null
        }
      />
    );
  }
}

export { Dropdown };
