import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import CreateFloorPlan from "./CreateFloorPlan.jsx";
import EditFloorPlan from "./EditFloorPlan.jsx";
import { NavLinkWrapper } from "../../components/NavLinkWrapper/NavLinkWrapper.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { FloorPlansList } from "../../components/FloorPlansList/FloorPlansList.jsx";
import BasePage from "../BasePage.jsx";
import DeleteFloorPlan from "./DeleteFloorPlan.jsx";

class FloorPlans extends BasePage {
  state = {
    propertyId: this.props.match.params.propertyId,
    isLoading: true,
    redirect: null,
    floorPlans: [],
  };

  async getFloorPlans() {
    this.setState({ isLoading: true });

    const floorPlans = await this.fetchFloorPlans();

    this.setState({
      floorPlans: floorPlans,
      isLoading: false,
    });
  }

  async fetchFloorPlans() {
    const { propertyId } = this.state;

    return await fetch(`/api/properties/${propertyId}/floor_plans`)
      .then((res) => res.json())
      .then(({ floorPlans }) => floorPlans)
      .catch(() =>
        this.setState({
          redirect: `/properties/${propertyId}`,
          isLoading: false,
        })
      );
  }

  async componentDidUpdate() {
    const { floorPlans, isLoading } = this.state;

    if (isLoading) return;

    const updated = await this.fetchFloorPlans();

    if (JSON.stringify(floorPlans) === JSON.stringify(updated)) return;

    this.getFloorPlans();
  }

  componentDidMount() {
    this.getFloorPlans();
  }

  render() {
    const { propertyId, floorPlans, isLoading, redirect } = this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <>
        <FloorPlansList floorPlans={floorPlans} />
        <NavLinkWrapper
          propertyId={propertyId}
          type="floor_plans"
          text="Add floor plan"
        />

        <Switch>
          <Route
            path="/properties/:propertyId/floor_plans/new"
            component={CreateFloorPlan}
          ></Route>
          <Route
            path="/properties/:propertyId/floor_plans/:floorPlanId/edit"
            component={EditFloorPlan}
          ></Route>
          <Route
            path="/properties/:propertyId/floor_plans/:floorPlanId/delete"
            component={DeleteFloorPlan}
          ></Route>
        </Switch>
      </>
    );
  }
}

export default withRouter(FloorPlans);
