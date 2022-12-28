import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Screens/Home";
import { SignUp } from "./Screens/SignUp";
import "./styles/App.css";
import { Room } from "./Screens/Room";
import { Join } from "./Screens/Join";
import { RecoilRoot } from "recoil";
import { Create } from "./Screens/Create";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/create" element={<Create />} />
          <Route path="/room" element={<Room />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
