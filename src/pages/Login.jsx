import React, { useState } from "react";
import {
  TextField,
  Container,
  Button,
  IconButton,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { Paper, Avatar } from "@material-ui/core";

function Login({ setAuthenticated }) {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "75px auto",
  };

  const avatarStyle = { backgroundColor: "#2F2FA2" };

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleJoinValidation = () => {
    const { email, password } = user;
    if (!email || !password) {
      toast.error("Both Email and Password are required", toastOptions);
      return false;
    }
    return true;
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (handleJoinValidation()) {
      try {
        const { email, password } = user;
        const { data } = await axios.post("http://localhost:4000/api/login", {
          email,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("accessToken", data.acessToken);
          setAuthenticated(true);
          navigate("/welcome");
        }
      } catch (error) {
        toast.error("Invalid Credentials", toastOptions);
      }
    }
  };

  return (
    <>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
        </Grid>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "#2f2fa2",
              }}
            >
              Login
            </Typography>
            <Box
              component="form"
              sx={{
                mt: 3,
              }}
            />
            <form onSubmit={loginUser}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    id="email"
                    label="Email Address"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: "#2F2FA2" }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/register" variant="body2">
                  Register Here
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
      <ToastContainer />
    </>
  );
}

export default Login;
