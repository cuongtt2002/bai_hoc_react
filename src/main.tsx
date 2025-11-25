import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HomePage } from "./pages/home/HomePage";
import { LoadingDataProvider } from "./components/Loading/LoadingData";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingDataProvider>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </LoadingDataProvider>
    <Toaster />
  </StrictMode>
);
