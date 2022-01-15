import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./lib/context";
import App from "./App";
import Login from "./pages/login";
import Calendar from "./pages/calendar";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="*" element={<div>404 page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
