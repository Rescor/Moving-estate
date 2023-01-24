import React from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../Context/Context.js";

class Index extends React.Component {
  render() {
    if (this.context.isManager) return <Redirect to="/manager" />;

    return <Redirect to="/properties" />;
  }
}

Index.contextType = Context;

export { Index };
