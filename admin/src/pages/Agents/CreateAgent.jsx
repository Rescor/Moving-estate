import React from "react";
import { Redirect } from "react-router-dom";
import { AgentForm } from "../../components/AgentForm/AgentForm.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import BasePage from "../BasePage.jsx";
import { Context } from "../../Context/Context.js";

class CreateAgent extends BasePage {
  state = {
    redirect: null,
    isLoading: false,
  };

  isManager() {
    this.setState({
      isLoading: true,
    });

    fetch("/api/auth/manager")
      .then((res) => res.json())
      .then((body) => {
        if (body.manager) this.setState({ isLoading: false });
        else this.setState({ isLoading: false, redirect: "/" });
      })
      .catch(() => this.setState({ isLoading: false, redirect: "/" }));
  }

  createAgent = (agent) =>
    this.createAction({
      url: "/api/agents",
      values: agent,
      successObject: "agent",
      redirect: "/agents",
    });

  returnToAgents = () => {
    this.setState({ redirect: "/agents" });
  };

  render() {
    const { redirect, isLoading } = this.state;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    if (this.context.isManager)
      return (
        <Modal title="Create a new agent:">
          <AgentForm
            values={{ name: "", email: "", location: "", photo: "" }}
            handleSubmit={this.createAgent}
            handleCancel={this.returnToAgents}
          />
        </Modal>
      );

    return <Redirect to="/" />;
  }
}

CreateAgent.contextType = Context;

export { CreateAgent };
