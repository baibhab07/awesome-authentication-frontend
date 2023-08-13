import React from "react";
import { Typography, Container, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

function WelcomeMessage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // clear the token from local storage
    navigate("/"); // navigate to the login page
  };

  return (
    <div style={containerStyle}>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "2rem", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body1">
            Thank you for logging in to our platform. We're excited to have you
            here.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            style={{ marginTop: "1rem" }}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

export default WelcomeMessage;
