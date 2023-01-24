import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { Modal } from "../../components/Modal/Modal.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";

class DeleteAgent extends React.Component {
  state = {
    agentId: this.props.match.params.agentId,
    agent: {},
    isLoading: true,
    agents: [],
    newAgentId: 0,
    hasProperties: false,
    redirect: null,
  };

  getAgents() {
    const { agentId } = this.state;

    this.setState({ isLoading: true });

    fetch("/api/agents")
      .then((r) => r.json())
      .then((data) => {
        const currentAgent = data.agents.find(
          (agent) => agent.id === Number(agentId)
        );
        const otherAgents = data.agents.filter(
          (agent) => agent.id !== Number(agentId)
        );

        this.setState({
          agent: currentAgent,
          agents: otherAgents,
          isLoading: false,
        });

        this.hasProperties(currentAgent.email);
      })
      .catch(() => this.setState({ redirect: "/agents" }))
      .finally(() => this.setState({ isLoading: false }));
  }

  hasProperties(email) {
    fetch(`/api/properties?email=${email}`)
      .then((r) => r.json())
      .then((body) => {
        if (body.properties.length > 0) this.setState({ hasProperties: true });
      })
      .catch(() => this.setState({ redirect: "/agents" }));
  }

  handleChange = (e) => {
    this.setState({ newAgentId: e.target.value });
  };

  deleteAgent = () => {
    const { agentId, newAgentId } = this.state;

    this.setState({ isLoading: true });

    fetch(`/api/agents/${agentId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ newAgentId: newAgentId }),
    }).finally(() => this.setState({ redirect: "/agents", isLoading: false }));
  };

  returnToAgentPage = () => {
    const { agentId } = this.state;

    this.setState({
      redirect: `/agents/${agentId}`,
    });
  };

  componentDidMount() {
    this.getAgents();
  }

  render() {
    const { agent, agents, isLoading, hasProperties, newAgentId, redirect } =
      this.state;
    const isDisabled = newAgentId === 0 && hasProperties === true;

    if (isLoading) return <Spinner />;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <Modal title={`Are you sure you want to delete ${agent.name}?`}>
        {hasProperties && (
          <FormControl sx={{ m: 2, minWidth: 300 }}>
            <Select defaultValue="" onChange={this.handleChange} displayEmpty>
              {agents.map((option) => {
                return (
                  <MenuItem key={option.name} value={option.id}>
                    {option.name.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              Select an agent to reassign properties to.
            </FormHelperText>
          </FormControl>
        )}
        <div>
          <MenuButton
            handleClick={this.deleteAgent}
            isDisabled={isDisabled}
            text="Delete"
          />
          <MenuButton handleClick={this.returnToAgentPage} text="Cancel" />
        </div>
      </Modal>
    );
  }
}

export default withRouter(DeleteAgent);
