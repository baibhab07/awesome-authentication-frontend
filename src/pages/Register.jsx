/* eslint-disable no-shadow */
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { Paper, Avatar } from "@material-ui/core";

function Register() {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "75px auto",
  };

  const avatarStyle = { backgroundColor: "#2F2FA2" };

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  let name;
  let value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleRegisterValidation = () => {
    const { email, password, confirmPassword } = user;
    if (!email || !password || !confirmPassword) {
      toast.error("All the fields are required", toastOptions);
      return false;
    }
    if (!email.match(emailPattern)) {
      toast.error("Invalid email address", toastOptions);
      return false;
    }
    if (!password.match(passwordPattern)) {
      toast.error(
        "Password must be 8 characters long and include at least one letter, one number and a special character",
        toastOptions
      );
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same", toastOptions);
      return false;
    }
    return true;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (handleRegisterValidation()) {
      const { email, password, confirmPassword } = user;

      const { data } = await axios.post("http://localhost:4000/api/register", {
        email,
        password,
        confirmPassword,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        toast.success(data.msg, {
          ...toastOptions,
          onClose: () => {
            navigate("/");
          },
        });
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
              Register
            </Typography>
            <Box
              component="form"
              sx={{
                mt: 3,
              }}
            />
            <form onSubmit={registerUser}>
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
                    onChange={handleInputs}
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
                    onChange={handleInputs}
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
                  <TextField
                    required
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={user.confirmPassword}
                    onChange={handleInputs}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={toggleConfirmPasswordVisibility}>
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
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
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/" variant="body2">
                  Already have an account? Sign in
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

export default Register;
