import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingView from "../../LoadingView/LoadingView";
import { useUser, User } from "../../../contexts/UserContext/UserContext";
type AuthProps = {
  children: React.ReactNode;
};

function Auth({ children }: AuthProps) {
  const [user, setUser] = useUser();
  const [isServerError, setIsServerError] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    undefined
  );
  const redirect = useNavigate();
  useEffect(() => {
    if (user == undefined || user.userType > 0) {
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [user]);
  return (
    <>
      {isServerError && <div>Server is running into a problem</div>}
      {isAuthorized == false && (
        <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center gap-3">
          <div>You are not authorized to access this information</div>
          <button
            onClick={(e) => {
              redirect("/login");
            }}
            className="btn btn-secondary"
          >
            Login as Admin
          </button>
        </div>
      )}
      {isAuthorized == true && children}
      {isAuthorized == undefined && (
        <>
          <h3>Authenticating...</h3>
        </>
      )}
    </>
  );
}

export default Auth;
