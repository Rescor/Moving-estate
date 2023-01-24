import React from "react";
import { Redirect, withRouter, Switch, Route } from "react-router-dom";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { PropertyTabs } from "../../components/PropertyTabs/PropertyTabs.jsx";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper.jsx";
import EditProperty from "./EditProperty.jsx";
import { DeleteProperty } from "./DeleteProperty.jsx";
import Amenities from "../Amenities.jsx";
import Images from "../Images/Images.jsx";
import FloorPlans from "../FloorPlans/FloorPlans.jsx";
import Features from "../Features/Features.jsx";
import BasePage from "../BasePage.jsx";

class Property extends BasePage {
  state = {
    property: {},
    propertyId: this.props.match.params.propertyId,
    isLoading: true,
    redirect: null,
  };

  async fetchProperty() {
    const { propertyId } = this.state;

    return await fetch(`/api/properties/${propertyId}`)
      .then((res) => res.json())
      .then((body) => {
        return {
          title: body.title,
          description: body.description,
          location: body.location[0] + ", " + body.location[1],
          type: body.type,
          mode: body.mode,
          price: body.price,
          area: body.area,
          bedrooms: body.bedrooms,
          bathrooms: body.bathrooms,
        };
      })
      .catch(() =>
        this.setState({ redirect: "/properties", isLoading: false })
      );
  }

  async getProperty() {
    this.setState({ isLoading: true });

    const property = await this.fetchProperty();

    this.setState({
      property: property,
      isLoading: false,
    });
  }

  componentDidMount() {
    this.getProperty();
  }

  async componentDidUpdate() {
    const { property, isLoading } = this.state;

    if (isLoading) return;

    const updated = await this.fetchProperty();

    if (JSON.stringify(property) === JSON.stringify(updated)) return;

    this.getProperty();
  }

  render() {
    const { isLoading, property, propertyId, redirect } = this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <PageWrapper message={`Property: ${propertyId}`}>
        <MenuButton
          text="Edit property"
          href={`/admin/properties/${propertyId}/edit`}
        />
        <MenuButton
          text="Delete property"
          href={`/admin/properties/${propertyId}/delete`}
        />
        <MenuButton
          text="To messages"
          href={`/admin/properties/${propertyId}/messages`}
        />
        <MenuButton text="To properties" href="/admin/properties" />
        {Object.keys(property).map((el) => (
          <dl key={el}>
            <dt>{`${el.toUpperCase()}:`}</dt>
            <dd>{property[el]}</dd>
          </dl>
        ))}
        <PropertyTabs propertyId={propertyId} />

        <Switch>
          <Route
            path="/properties/:propertyId/edit"
            component={EditProperty}
          ></Route>
          <Route
            path="/properties/:propertyId/delete"
            component={DeleteProperty}
          ></Route>
          <Route path="/properties/:propertyId/amenities">
            <Amenities />
          </Route>
          <Route path="/properties/:propertyId/images">
            <Images />
          </Route>
          <Route path="/properties/:propertyId/floor_plans">
            <FloorPlans />
          </Route>
          <Route path="/properties/:propertyId/features">
            <Features />
          </Route>
        </Switch>
      </PageWrapper>
    );
  }
}

export default withRouter(Property);
