import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import NotAuthenticated from "./pages/NotAuthenticated";

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("accessToken") ? true : false
  );

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/welcome"
            element={authenticated ? <Welcome /> : <NotAuthenticated />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
