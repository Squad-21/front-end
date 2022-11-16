import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Badge,
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { default as AvatarElement } from "@mui/material/Avatar";
import { Style } from "../../../constants/style";
import useAuthStore from "../../../context/authStore";
import { default as styledComponents } from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "../../../hooks/useLogout";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${Style.colors["violet-550"]}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Avatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const logout = useLogout();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    if (!user) return;

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      variant="dot"
    >
      <AvatarContainer aria-describedby={id} onClick={handleClick}>
        <AvatarElement
          alt={user?.name ? user.name : "Convidado"}
          src={user?.avatar.url}
          sx={{
            backgroundColor: Style.colors["orange-650"],
            '.MuiAvatar-img': {
              objectFit: 'fill'
            }
          }}
        >
          C
        </AvatarElement>
      </AvatarContainer>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          cursor: "pointer"
        }}
      >
        <List component="nav">
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <PermIdentityIcon />
            </ListItemIcon>
            <a href="/perfil">Meu Perfil</a>
          </ListItemButton>
          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </List>
      </Popover>
    </StyledBadge>
  );
};

export default Avatar;

const AvatarContainer = styledComponents.div`
    cursor: pointer;
`;
