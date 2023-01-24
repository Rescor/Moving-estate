import React from "react";
import { Button } from "../../controls/Button/Button.jsx";
import styles from "./Pagination.module.css";

class Pagination extends React.Component {
  preparePageButtons() {
    const active = this.props.page;
    const pages = this.props.pages;
    let start = Math.max(1, Math.min(active - 1, active - 2));
    let end = Math.min(pages, Math.max(active + 1, active + 2));
    if (active > pages) {
      start = Math.max(1, pages - 4);
      end = pages;
    } else if (active < 1) {
      start = 1;
      end = Math.min(5, pages);
    }
    const buttons = [];

    for (let i = start; i <= end; i++) {
      const props = { size: "m" };
      if (i === start) props.roundedLeft = true;
      if (i === end) props.roundedRight = true;
      if (i === active) props.isFocused = true;
      buttons.push({ pageNumber: i, ...props });
    }
    return buttons;
  }

  render() {
    const { page, pages, onChange } = this.props;
    const pageButtons = this.preparePageButtons();

    return (
      <div className={styles.wrapper}>
        {page > 1 && page <= pages && (
          <Button
            size="m"
            roundedLeft
            roundedRight
            onClick={() => onChange(page - 1)}
          >
            &lt;
          </Button>
        )}
        <div className={styles.pages}>
          {pageButtons.map((button) => {
            const { pageNumber, ...properties } = button;
            return (
              <Button
                key={pageNumber}
                {...properties}
                onClick={() => onChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>
        {page < pages && page >= 1 && (
          <Button
            size="m"
            roundedLeft
            roundedRight
            onClick={() => onChange(page + 1)}
          >
            &gt;
          </Button>
        )}
      </div>
    );
  }
}

export { Pagination };
