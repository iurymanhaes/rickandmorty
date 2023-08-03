import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AppBar, Toolbar, Box, Button, Container } from "@mui/material/";

import logo from "../../public/assets/logo-black.png";
import { karlaFont } from "@src/styles/fonts";

const Header = () => {
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ flexGrow: 1 }} color="secondary">
      <Container>
        <Toolbar
          sx={{
            padding: "0 !important",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Image src={logo} alt="logo header" width={46} height={49} />
          <Box component="nav">
            <Link href="/" passHref style={{ textDecoration: "none" }}>
              <Button
                className={karlaFont.className}
                sx={{
                  color: router.asPath === "/" ? "#1ABED6" : "#000000",
                  textShadow:
                    router.asPath === "/" ? "7px 0px 12px #A4FE91" : "",
                  fontSize: "18px",
                  textTransform: "initial",
                }}
              >
                Personagens
              </Button>
            </Link>
            <Link href="/favorites" style={{ textDecoration: "none" }}>
              <Button
                className={karlaFont.className}
                sx={{
                  color: router.asPath === "/favorites" ? "#1ABED6" : "#000000",
                  textShadow:
                    router.asPath === "/favorites"
                      ? "7px 0px 12px #A4FE91"
                      : "",
                  fontSize: "18px",
                  textTransform: "initial",
                }}
              >
                Favoritos
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
