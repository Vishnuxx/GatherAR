import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
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

import { Dashboard } from "./Screens/Dashboard";
import { useEffect } from "react";
import { UploadModel } from "./Screens/UploadModel";

function App() {
  
  return (
    <RecoilRoot>
      <HashRouter>
        <LoadingModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={APPROUTES.dashboard} element={<Dashboard />} />
          <Route path={APPROUTES.join} element={<Join />} />
          <Route path={APPROUTES.joinByUrl} element={<JoinUrl />} />
          <Route
            path={APPROUTES.upload}
            element={
              <PrivateRoute to={<UploadModel />} errorRedirect={APPROUTES.home} />
            }
          />
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
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
