import React from "react";

import { Typography, Container, Paper } from "@mui/material";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

function NotAuthenticated() {
  return (
    <div style={containerStyle}>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "2rem", textAlign: "center" }}>
          <Typography variant="body1">
            Please Log In to access this page.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default NotAuthenticated;
