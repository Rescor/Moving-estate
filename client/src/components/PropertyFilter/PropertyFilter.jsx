import React from "react";
import Subtitle from "../Subtitle/Subtitle.jsx";
import { Button } from "../../controls/Button/Button.jsx";
import { Input } from "../../controls/Input/Input.jsx";
import { Dropdown } from "../../controls/Dropdown/Dropdown.jsx";
import styles from "./PropertyFilter.module.css";

class PropertyFilter extends React.Component {
  constructor(props) {
    super(props);
    this.sendFilterParams = this.sendFilterParams.bind(this);
    this.state = {
      filterParams: {},
    };
  }

  componentDidMount() {
    this.setState({
      filterParams: this.props.values,
    });
  }

  componentDidUpdate(prevprops, _) {
    if (JSON.stringify(prevprops.values) === JSON.stringify(this.props.values))
      return;
    this.setState({
      filterParams: this.props.values,
    });
  }

  setFilterParams(type, value) {
    let filterParams = { ...this.state.filterParams, [type]: value };
    this.setState({
      filterParams: filterParams,
    });
  }

  sendFilterParams() {
    const sendingParams = {};
    for (let key in this.state.filterParams) {
      if (this.state.filterParams[key])
        sendingParams[key] = this.state.filterParams[key];
    }
    return sendingParams;
  }

  render() {
    const { options } = this.props;
    const { filterParams } = this.state;
    return (
      <form
        className={styles.property_filter}
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onSubmit(this.sendFilterParams());
        }}
      >
        <Subtitle>PROPERTY SEARCH</Subtitle>

        <Input
          placeholder="Property title, Property Content, Exerpt"
          type="text"
          onChange={(value) => this.setFilterParams("title", value)}
          value={filterParams.title}
        />

        <Dropdown
          placeholder="Type"
          options={options.type.map((item) => {
            return {
              value: item,
              label: item,
            };
          })}
          onChange={(value) => this.setFilterParams("type", value)}
          value={filterParams.type}
        />

        <Dropdown
          placeholder="Status"
          options={options.mode.map((item) => {
            return {
              value: item,
              label: item,
            };
          })}
          onChange={(value) => this.setFilterParams("mode", value)}
          value={filterParams.mode}
        />

        <Input
          type="number"
          placeholder="Min. Area"
          onChange={(value) => this.setFilterParams("minArea", value)}
          width="half"
          value={filterParams.minArea}
        />

        <Input
          type="number"
          placeholder="Max. Area"
          onChange={(value) => this.setFilterParams("maxArea", value)}
          width="half"
          value={filterParams.maxArea}
        />

        <Dropdown
          placeholder="Bedrooms"
          options={options.bedrooms.map((item) => {
            return {
              value: item,
              label: item,
            };
          })}
          width="half"
          onChange={(value) => this.setFilterParams("bedrooms", value)}
          value={filterParams.bedrooms}
        />

        <Dropdown
          placeholder="Bathrooms"
          options={options.bathrooms.map((item) => {
            return {
              value: item,
              label: item,
            };
          })}
          width="half"
          onChange={(value) => this.setFilterParams("bathrooms", value)}
          value={filterParams.bathrooms}
        />

        <Input
          type="number"
          placeholder="Min. Price"
          onChange={(value) => this.setFilterParams("minPrice", value)}
          width="half"
          value={filterParams.minPrice}
        />

        <Input
          type="number"
          placeholder="Max. Price"
          onChange={(value) => this.setFilterParams("maxPrice", value)}
          width="half"
          value={filterParams.maxPrice}
        />

        <Dropdown
          placeholder="Location"
          options={options.location.map((loc) => {
            return {
              value: loc,
              label: loc,
            };
          })}
          onChange={(value) => this.setFilterParams("location", value)}
          value={filterParams.location}
        />

        <Input
          placeholder="Min. Year Built"
          type="number"
          onChange={(value) => this.setFilterParams("minYear", value)}
          value={filterParams.minYear}
        />

        <Button type="submit" size="l" roundedLeft roundedRight>
          Search
        </Button>
      </form>
    );
  }
}

export { PropertyFilter };
