import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { App } from "./App";
import "@radix-ui/themes/styles.css";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
