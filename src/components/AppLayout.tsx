import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

import Header from "./Header";
import theme from "@src/config/theme";


function AppLayout<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WrappedWithLayout = (props: P) => (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{padding:'24px'}}>
        <WrappedComponent {...props} />
      </Container>
    </ThemeProvider>
  );

  return WrappedWithLayout;
}

export default AppLayout;
