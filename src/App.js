import "./styles.css";
import Home from "./Home";
import Search from "./Search";
import { LoginContex } from "./Context";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [fvalue, setValue] = useState(""); // Shared search value

  return (
    <div className="App">
      {/* Move the Routes INSIDE the Provider */}
      <LoginContex.Provider value={{ fvalue, setValue }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </LoginContex.Provider>
    </div>
  );
}
