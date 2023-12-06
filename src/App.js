import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ErrorPage from "./pages/ErrorPage";
import PreviewPage from "./pages/preview";

const App = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/preview" element={<PreviewPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default App;
