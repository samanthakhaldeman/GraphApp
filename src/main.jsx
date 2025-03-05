import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css";

import App from "./App";
import { ReactFlowProvider } from "reactflow";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </StrictMode>
);