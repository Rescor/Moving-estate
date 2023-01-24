import React from "react";
import { Redirect } from "react-router-dom";
import { MenuButton } from "../controls/MenuButton/MenuButton.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { Context } from "../Context/Context.js";

class Manager extends React.Component {
  render() {
    if (this.context.isManager)
      return (
        <PageWrapper>
          <MenuButton text="To agents" href="/admin/agents" />
          <MenuButton text="To properties" href="/admin/properties" />
        </PageWrapper>
      );

    return <Redirect to="/" />;
  }
}

Manager.contextType = Context;

export { Manager };
