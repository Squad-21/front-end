import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import LogoImg from "../../../../images/laranja_logo.png";
import LogoutIcon from "@mui/icons-material/Logout";

export function AvatarPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        <img className="w-10" src={LogoImg} alt="logo" />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            border: 1,
            p: 2,
            bgcolor: "white",
            width: "6rem",
            borderColor: "blue",
            borderRadius: "4px",
          }}
        >
          <LogoutIcon />
          Sair
        </Box>
      </Popper>
    </div>
  );
}
