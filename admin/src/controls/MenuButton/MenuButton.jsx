import React from "react";
import { Button } from "@mui/material";

class MenuButton extends React.Component {
  render() {
    const { text, href, type, handleClick, isDisabled } = this.props;

    return <Button
      sx={{ m: 1, p: 1 }}
      variant="contained"
      disabled={isDisabled}
      href={href}
      onClick={handleClick}
      type={type}
    >
      {text}
    </Button>
  }
}

export { MenuButton };
