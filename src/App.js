
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Screens/Home/Home";
import { SignUp } from "./Screens/Auth/SignUp";
import "./styles/App.css";
import { Room } from "./Screens/Room/Room";
import { Join } from "./Screens/Join/Join";
import {RecoilRoot} from 'recoil'


function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/room" element={<Room />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
