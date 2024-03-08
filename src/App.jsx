import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/joy/Box";

import Home from "./views/Home";
import ManageAnime from "./views/ManageAnime";
import AddAnime from "./views/AddAnime";
import NavBar from "./components/NavBar";
import AnimeDetail from "./views/AnimeDetail";
import AllAnime from "./views/AllAnime";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<AnimeDetail />} />
          <Route path="/manageanime" element={<ManageAnime />} />
          <Route path="/addanime" element={<AddAnime />} />
          <Route path="/allanime" element={<AllAnime />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
