import React from "react";
import { withRouter } from "react-router-dom";
import { Page } from "../components/Page/Page.jsx";
import { PropertyList } from "../components/PropertyList/PropertyList.jsx";
import { PropertyFilter } from "../components/PropertyFilter/PropertyFilter.jsx";
import { Spinner } from "../components/Spinner/Spinner.jsx";

class Index extends React.Component {
  state = {
    filteredProperties: [],
    selectedOptions: {},
    options: {},
    pages: null,
    isLoading: false,
  };

  paramsToObject(params) {
    const filters = {};
    for (const [key, value] of params) {
      filters[key] = value;
    }
    return filters;
  }

  clearOptions(options) {
    const filterFields = [
      "title",
      "type",
      "mode",
      "minArea",
      "maxArea",
      "bedrooms",
      "bathrooms",
      "minPrice",
      "maxPrice",
      "location",
      "minYear",
      "page",
    ];
    Object.keys(options).forEach((key) => {
      if (!filterFields.includes(key)) delete options[key];
    });
    return options;
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const urlOptions = this.paramsToObject(params);
    const clearedOptions = this.clearOptions(urlOptions);

    if (clearedOptions.page === undefined) clearedOptions.page = 1;

    this.updateOptions(clearedOptions);
  }

  componentDidUpdate(_, prevState) {
    const { selectedOptions } = this.state;
    if (
      JSON.stringify(selectedOptions) ===
      JSON.stringify(prevState.selectedOptions)
    )
      return;

    this.getProperties();
  }

  getProperties() {
    this.setState({ isLoading: true });

    const urlQueryParams = new URLSearchParams(
      this.state.selectedOptions
    ).toString();

    fetch("/api/client/properties?" + urlQueryParams)
      .then((r) => r.json())
      .then(({ properties, options, pages }) => {
        this.setState({
          filteredProperties: properties,
          options: options,
          pages: pages,
          isLoading: false,
        });
      });
  }

  serializeToUrl(options) {
    let filterOptions = new URLSearchParams(options).toString();
    this.props.history.push({
      search: `?${filterOptions}`,
    });
  }

  updateOptions(newOptions) {
    this.setState({ selectedOptions: newOptions });
    this.serializeToUrl(newOptions);
  }

  filterProperties(filters) {
    this.updateOptions({ ...filters, page: 1 });
  }

  changePage(page) {
    this.updateOptions({ ...this.state.selectedOptions, page: page });
  }

  render() {
    const { filteredProperties, selectedOptions, options, pages, isLoading } =
      this.state;

    if (Object.keys(options).length === 0) return;

    return (
      <Page title="PROPERTIES" hasSidebar>
        <PropertyFilter
          values={selectedOptions}
          options={options}
          onSubmit={(filters) => this.filterProperties(filters)}
        />
        <PropertyList
          pages={pages}
          page={selectedOptions.page}
          defaultView="grid"
          properties={filteredProperties}
          changePage={(page) => this.changePage(page)}
        >
          {isLoading && <Spinner />}
        </PropertyList>
      </Page>
    );
  }
}

export default withRouter(Index);
