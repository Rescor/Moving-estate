import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import CreateFeature from "./CreateFeature.jsx";
import EditFeature from "./EditFeature.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { FeaturesList } from "../../components/FeaturesList/FeaturesList.jsx";
import { NavLinkWrapper } from "../../components/NavLinkWrapper/NavLinkWrapper.jsx";
import BasePage from "../BasePage.jsx";
import DeleteFeature from "./DeleteFeature.jsx";

class Features extends BasePage {
  state = {
    propertyId: this.props.match.params.propertyId,
    isLoading: true,
    redirect: null,
    features: [],
    disableAdd: false,
  };

  async getFeatures() {
    this.setState({ isLoading: true });

    const features = await this.fetchFeatures();

    this.setState({
      features: features,
      isLoading: false,
      disableAdd: features.length === 3 ? true : false,
    });
  }

  async fetchFeatures() {
    const { propertyId } = this.state;

    return await fetch(`/api/properties/${propertyId}/features`)
      .then((res) => res.json())
      .then(({ features }) => features)
      .catch(() =>
        this.setState({
          redirect: `/properties/${propertyId}`,
          isLoading: false,
        })
      );
  }

  componentDidMount() {
    this.getFeatures();
  }

  async componentDidUpdate() {
    const { features, isLoading } = this.state;

    if (isLoading) return;

    const newFeatures = await this.fetchFeatures();

    if (JSON.stringify(features) === JSON.stringify(newFeatures)) return;

    this.getFeatures();
  }

  render() {
    const { propertyId, features, isLoading, redirect, disableAdd } =
      this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <>
        <FeaturesList features={features} />
        <NavLinkWrapper
          propertyId={propertyId}
          disabled={disableAdd}
          type="features"
          text="Add Feature"
        />

        <Switch>
          <Route
            path="/properties/:propertyId/features/new"
            component={CreateFeature}
          ></Route>
          <Route
            path="/properties/:propertyId/features/:icon/edit"
            component={EditFeature}
          ></Route>
          <Route
            path="/properties/:propertyId/features/:icon/delete"
            component={DeleteFeature}
          ></Route>
        </Switch>
      </>
    );
  }
}

export default withRouter(Features);
