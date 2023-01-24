import React from "react";
import { NavLink } from "react-router-dom";
import { Input, MenuItem, FormControl } from "@mui/material";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";
import Select from "@mui/material/Select";
import styles from "./FeatureForm.module.css";

class FeatureForm extends React.Component {
  state = {
    isDisabled: true,
    icon: this.props.icon || "",
    title: this.props.title || "",
    allFeatures: ["paw", "pool", "fence"],
  };

  handleChange(name, value) {
    this.setState({ [name]: value, isDisabled: true });
  }

  componentDidUpdate(prevProps) {
    const { icon, title, isDisabled } = this.state;

    if (
      isDisabled === false ||
      (icon === prevProps.icon && title === prevProps.title) ||
      title === "" ||
      icon === ""
    )
      return;

    this.setState({ isDisabled: false });
  }

  onSave = () => {
    const { handleSubmit } = this.props;
    const { icon, title } = this.state;

    handleSubmit(icon, title);
  };

  render() {
    const { propertyId, features, editMode } = this.props;
    const { icon, title, allFeatures, isDisabled } = this.state;

    return (
      <form className={styles.form}>
        <label>Icon: </label>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <Select
            value={icon}
            onChange={(e) => this.handleChange("icon", e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {allFeatures.map((option) => {
              return (
                <MenuItem
                  key={option}
                  disabled={
                    features.some((feature) => feature.feature === option) ||
                    editMode
                  }
                  value={option}
                >
                  {option.toUpperCase()}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <label>Title: </label>
        <Input
          defaultValue={title}
          onChange={(e) => this.handleChange("title", e.target.value)}
          className={styles.input}
        />
        <NavLink
          onClick={(event) => isDisabled && event.preventDefault()}
          to={`/properties/${propertyId}/features`}
          className={styles.nav_link}
        >
          <MenuButton
            handleClick={this.onSave}
            isDisabled={isDisabled}
            text="Save"
          />
        </NavLink>
        <NavLink
          to={`/properties/${propertyId}/features`}
          className={styles.nav_link}
        >
          <MenuButton text="Cancel" />
        </NavLink>
      </form>
    );
  }
}

export { FeatureForm };
