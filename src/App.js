import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Screens/Home";
import { SignUp } from "./Screens/SignUp";
import "./styles/App.css";
import { Room } from "./Screens/Room";
import { Join } from "./Screens/Join";
import { RecoilRoot } from "recoil";
import { Create } from "./Screens/Create";
import { JoinUrl } from "./Screens/JoinUrl";
import { APPROUTES } from "./AppConstants";

function App() {
  console.log("app")
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={APPROUTES.join} element={<Join />} />
          <Route path={APPROUTES.joinByUrl} element={<JoinUrl />} />
          <Route path={APPROUTES.create} element={<Create />} />
          <Route path={APPROUTES.room} element={<Room />} />
          <Route path={APPROUTES.signUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
