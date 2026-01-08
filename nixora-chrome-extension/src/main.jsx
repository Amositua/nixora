import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./api/interceptor.js";
import { AuthProvider } from "./context/AuthProvider.jsx";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("Root element not found!");
    return;
  }

  createRoot(rootElement).render(
    <StrictMode>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </StrictMode>
  );
});
