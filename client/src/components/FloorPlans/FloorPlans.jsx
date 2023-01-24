import React from "react";
import Subtitle from "../Subtitle/Subtitle.jsx";
import classes from "./FloorPlans.module.css";

class FloorPlans extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlan: this.props.plans[0],
      focused: 0,
    };
  }

  showImage(plan) {
    this.setState({
      currentPlan: plan,
      focused: this.props.plans.indexOf(plan),
    });
  }

  computeClassName(i) {
    return i === this.state.focused ? classes.plan_btn_focus : classes.plan_btn_not_focus
  }

  showErrorImage = ({ target }) => {
    target.src="image_not_available.png"
  }

  render() {
    return (
      <section>
        <Subtitle>FLOOR PLANS</Subtitle>
        <div className={classes.floor_plans}>
          {this.props.plans.map((plan, i) => {
            return (
              <button className={this.computeClassName(i)} onClick={() => this.showImage(plan)} key={plan.name}>
                {plan.name}
              </button>
            )
          })}
          <img className={classes.floor_img}
            src={this.state.currentPlan.url}
            onError={this.showErrorImage}
            alt={this.state.currentPlan.name} />
        </div>
      </section>
    );
  }
}

export default FloorPlans;