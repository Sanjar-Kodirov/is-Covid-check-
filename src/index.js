import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./context";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>
);
