import "./styles.css";
import Home from "./Home";

import Search from "./Search";
import { LoginContex } from "./Context";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [fvalue, setValue] = useState(" ");
  return (
    <div className="App">
      <LoginContex.Provider value={{ fvalue, setValue }}></LoginContex.Provider>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </div>
  );
}
