import React from "react";
import { NavLink } from "react-router-dom"
import ViewModeToggle from "../ViewModeToggle/ViewModeToggle.jsx";
import { Pagination } from "../Pagination/Pagination.jsx";
import PropertyCard from "../PropertyCard/PropertyCard.jsx";
import styles from "./PropertyList.module.css";

class PropertyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMode: this.props.defaultView
    };
  }

  toggleViewMode(mode) {
    if (mode === this.props.currentMode) return;

    this.setState({
      currentMode: mode,
    });
  }

  changePage(page) {
    if (page === this.props.currentPage) return;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    this.props.changePage(page);
  }

  className() {
    const classes = [styles.properties_wrapper];
    this.state.currentMode === "grid" && classes.push(styles.grid_view_mode);

    return classes.join(" ");
  }

  render() {
    const {pages, page, properties} = this.props;

    return <div>
      <ViewModeToggle
        mode={this.state.currentMode}
        onChange={mode => this.toggleViewMode(mode)}
      />
      {this.props.children ?
        this.props.children :
        <div className={this.className()}>
          {Object.keys(properties).length !== 0 && properties.map(property => {
            const { id, ...props } = property;
            return (
              <NavLink to={`${id}`} key={`${id}-link`}>
                <PropertyCard
                  viewMode={this.state.currentMode}
                  {...props}
                />
              </NavLink>
            )
          })}
        </div>
      }
      <Pagination
        pages={pages}
        page={page}
        onChange={page => this.changePage(page)}
      />
    </div>
  }
}

export { PropertyList };
