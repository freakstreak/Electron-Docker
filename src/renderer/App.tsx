import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import Volumes from "./pages/volumes";
import Containers from "./pages/containers";
import Images from "./pages/images";
import DevEnvironment from "./pages/dev-environments/dev-environments";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Containers />} />
          <Route path="/volumes" element={<Volumes />} />
          <Route path="/images" element={<Images />} />
          <Route path="/dev-environments" element={<DevEnvironment />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
