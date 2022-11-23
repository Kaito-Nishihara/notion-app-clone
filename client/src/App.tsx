import { CssBaseline } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
