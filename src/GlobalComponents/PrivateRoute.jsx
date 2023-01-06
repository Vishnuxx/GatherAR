import { useEffect, useState } from "react";
import { checkLoginStatus } from "../Utilities/Auth";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ to, errorRedirect }) {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(false);
  useEffect(() => {
    checkLoginStatus(
      (user) => {
        setauthenticated(true);
      },
      (err) => {
        setauthenticated(false);
        navigate(errorRedirect, {
          replace: true,
        });
      }
    );
  }, []);
  return authenticated && to;
}
