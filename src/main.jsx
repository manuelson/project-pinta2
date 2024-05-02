import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "src/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider.Provider>
    <App />
  </AuthProvider.Provider>
);
