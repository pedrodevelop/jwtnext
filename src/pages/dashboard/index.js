import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import Router from "next/router";

import { AuthContext } from "../../contexts/AuthContext";
import { destroyCookie, parseCookies } from "nookies";
import { getAPIClient } from "../../services/axios";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [userMenu, setUserMenu] = useState(null);

  const handleOpenUserMenu = (e) => {
    setUserMenu(e.currentTarget);
  };

  const handleLogOut = () => {
    destroyCookie(null, "nextauth-token");
    Router.push("/");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              DASHBOARD
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              DASHBOARD
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="div" sx={{ mr: 2 }}>
                {user?.name}
              </Typography>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.avatar_url} />
              </IconButton>
            </Box>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={userMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(userMenu)}
            >
              <MenuItem onClick={handleLogOut}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <Typography>Teste</Typography>
    </>
  );
}

export default Dashboard;

export async function getServerSideProps(ctx) {
  const { ["nextauth-token"]: token } = parseCookies(ctx);
  const apiClient = getAPIClient(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
