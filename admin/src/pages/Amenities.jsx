import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { AmenitiesPageContent } from "../components/AmenitiesPageContent/AmenitiesPageContent.jsx";
import { Spinner } from "../components/Spinner/Spinner.jsx";
import BasePage from "./BasePage.jsx";

class Amenities extends BasePage {
  constructor(props) {
    super(props);

    this.isChecked = this.isChecked.bind(this);

    this.state = {
      propertyId: this.props.match.params.propertyId,
      amenities: [],
      isLoading: true,
      redirect: null,
    };
  }

  createAmenity = (title) =>
    this.createAction({
      url: `/api/properties/${this.state.propertyId}/amenities`,
      values: { title: title },
      redirect: `/properties/${this.state.propertyId}`,
    });

  deleteAmenity = (amenityTitle) =>
    this.deleteAction({
      url: `/api/properties/${this.state.propertyId}/amenities/${amenityTitle}`,
      failureRedirect: `/properties/${this.state.propertyId}`,
    });

  isChecked(item) {
    const { amenities } = this.state;
    const isChecked = amenities.find(
      (amenity) => amenity.title === item.title
    ).available;

    if (isChecked) {
      let amenityTitle = item.title;

      if (amenityTitle.includes("/"))
        amenityTitle = amenityTitle.replace(/\//g, "%2F");
      if (amenityTitle.includes("&"))
        amenityTitle = amenityTitle.replace(/&/g, "%26");
      amenityTitle = amenityTitle.replace(/ /g, "%20");

      this.deleteAmenity(amenityTitle);
    } else {
      this.createAmenity(item.title);
    }
  }

  async getAmenities() {
    this.setState({ isLoading: true });

    const amenities = await this.fetchAmenities();

    this.setState({
      amenities: amenities,
      isLoading: false,
    });
  }

  async fetchAmenities() {
    const { propertyId } = this.state;

    return await fetch(`/api/properties/${propertyId}/amenities`)
      .then((res) => res.json())
      .then(({ amenities }) => amenities)
      .catch(() =>
        this.setState({ redirect: "/properties", isLoading: false })
      );
  }

  async componentDidUpdate() {
    const { amenities } = this.state;
    const updated = await this.fetchAmenities();

    if (JSON.stringify(amenities) === JSON.stringify(updated)) return;

    this.setState({ amenities: updated });
  }

  componentDidMount() {
    this.getAmenities();
  }

  render() {
    const { isLoading, amenities, redirect } = this.state;

    if (redirect) return <Redirect to={redirect} />;

    if (isLoading) return <Spinner />;

    return (
      <AmenitiesPageContent amenities={amenities} isChecked={this.isChecked} />
    );
  }
}

export default withRouter(Amenities);
