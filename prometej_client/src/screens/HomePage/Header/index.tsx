import { Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import {
  AppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../index.styled";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { RootState, store } from "../../../store/store";
import { clearUser } from "../../../store/slices/userSlice";

interface HeaderProps {
  toggle: boolean;
  toggleSidebar: () => void;
}

export default function Header({ toggle, toggleSidebar }: HeaderProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { authenticated } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const userMenu = () => (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom", // Position the menu below the account icon
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseUserMenu}
    >
      {!authenticated ? (
        <MenuItem onClick={() => navigate("/register")}>
          Registriraj se
        </MenuItem>
      ) : (
        ""
      )}
      {!authenticated ? (
        <MenuItem onClick={() => navigate("/login")}>Prijavi se</MenuItem>
      ) : (
        ""
      )}
      {authenticated ? (
        <MenuItem onClick={handleLogout}>Odjavi se</MenuItem>
      ) : (
        ""
      )}
    </Menu>
  );

  const handleLogout = (): void => {
    localStorage.removeItem("userId");
    handleCloseUserMenu();
    store.dispatch(clearUser());
    navigate("/learning");
  };

  return (
    <AppBar position="fixed" open={toggle}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{
            marginRight: 5,
            ...(toggle && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pretraži..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={"primary-search-account-menu"}
            aria-haspopup="true"
            onClick={handleOpenUserMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {anchorEl && userMenu()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
