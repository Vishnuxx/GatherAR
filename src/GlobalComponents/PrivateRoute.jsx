import { useEffect, useState } from "react";
import { checkLoginStatus } from "../Utilities/Auth";
import { useNavigate } from "react-router-dom";
import { showToast } from "../State/appActions";
import { useToaster } from "../hooks/Toaster";

export function PrivateRoute({ to, errorRedirect }) {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(false);
  const showToast = useToaster()
  useEffect(() => {
    checkLoginStatus(
      (user) => {
        setauthenticated(true);
      },
      (err) => {
        setauthenticated(false);
        showToast("You are not authenticated. Please login");
        navigate(errorRedirect, {
          replace: true,
        });
      }
    );
  }, []);
  return authenticated && to;
}
