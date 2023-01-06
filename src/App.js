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
import { Login } from "./Screens/Login";
import { LoadingModal } from "./GlobalComponents/LoadingModal";
import { PrivateRoute } from "./GlobalComponents/PrivateRoute";
import { Toaster } from "./GlobalComponents/Toaster";

function App() {
  
  return (
    <RecoilRoot>
      <BrowserRouter>
        <LoadingModal />
        <Toaster></Toaster>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={APPROUTES.join} element={<Join />} />
          <Route path={APPROUTES.joinByUrl} element={<JoinUrl />} />
          <Route
            path={APPROUTES.create}
            element={
              <PrivateRoute to={<Create />} errorRedirect={APPROUTES.home} />
            }
          />
          <Route path={APPROUTES.room} element={<Room />} />
          <Route path={APPROUTES.signUp} element={<SignUp />} />
          <Route path={APPROUTES.login} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
