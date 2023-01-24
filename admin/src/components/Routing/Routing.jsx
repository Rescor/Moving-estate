import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Messages from "../../pages/Messages.jsx";
import { Index } from "../../pages/Index.jsx";
import { Properties } from "../../pages/Properties/Properties.jsx";
import { Agents } from "../../pages/Agents/Agents.jsx";
import Agent from "../../pages/Agents/Agent.jsx";
import Property from "../../pages/Properties/Property.jsx";
import { Manager } from "../../pages/Manager.jsx";
import { SignIn } from "../../pages/SignIn.jsx";

class Routing extends React.Component {
  render() {
    const { currentUser } = this.props;

    if (!currentUser)
      return (
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      );

    return (
      <Switch>
        <Route path="/properties/new">
          <Properties />
        </Route>
        <Route path="/properties/:propertyId/messages">
          <Messages />
        </Route>
        <Route path="/properties/:propertyId">
          <Property />
        </Route>
        <Route path="/properties">
          <Properties />
        </Route>
        <Route path="/agents/new">
          <Agents />
        </Route>
        <Route path="/agents/:agentId">
          <Agent />
        </Route>
        <Route path="/agents">
          <Agents />
        </Route>
        <Route path="/manager">
          <Manager />
        </Route>
        <Route>
          <Index path="/index" />
        </Route>
      </Switch>
    );
  }
}

export { Routing };
