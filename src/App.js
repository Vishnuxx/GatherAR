import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Screens/Home/Home";
import { SignUp } from "./Screens/Auth/SignUp";
import "./styles/App.css";
import { Room } from "./Screens/Room/Room";
import { Join } from "./Screens/Join/Join";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/room" element={<Room />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
