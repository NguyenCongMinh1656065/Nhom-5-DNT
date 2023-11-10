import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { useLocation, useNavigate } from "react-router";
import Profile from "../Profile/Profile";
import { EAdminPage } from "../../utilities/utils";
import { useUser } from "../../contexts/UserContext/UserContext";

export type ToggleLoginBtnProps = {
  className?: string[];
  isAdmin?: boolean;
};
function ToggleLoginBtn({ className, isAdmin }: ToggleLoginBtnProps) {
  const location = useLocation();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isClickLogout, setIsClickLogout] = useState(false);
  const redirect = useNavigate();
  const [userName, setUserName] = useState("anonymous");
  const [user, setUser] = useUser();
  useEffect(() => {
    if (user) {
      setUserName(user.fullName);
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
      setUserName("");
    }
  }, [user]);
  return (
    <>
      <div className="dropdown">
        <a
          className="nav-link dropdown-togglepostition-relative"
          href="#"
          style={{
            width: "35px",
            height: "35px",
          }}
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            fill="currentColor"
            className="bi bi-person-circle w-100 h-100"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </a>

        <ul
          className={`dropdown-menu ${className?.join(" ")}`}
          id={`${styles["dropdown-menu"]}`}
        >
          {isUserLoggedIn ? (
            <>
              {user?.userType == 1 && (
                <li>
                  <div
                    onClick={(e) => {
                      if (isAdmin) {
                        redirect("/");
                      } else {
                        redirect("/admin");
                      }
                    }}
                    className="dropdown-item"
                  >
                    {location.pathname.includes("/admin") ? "Shop" : "Admin"}
                  </div>
                </li>
              )}
              <li>
                <div
                  onClick={(e) => {
                    setUser(undefined);
                    localStorage.clear();
                    redirect("/");
                  }}
                  className="dropdown-item"
                >
                  Logout
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="d-flex justify-content-center">
                <small>
                  <b>{userName}</b>
                </small>
              </li>
            </>
          ) : (
            <>
              <li>
                <div
                  onClick={(e) => {
                    redirect("/login");
                  }}
                  className="dropdown-item"
                >
                  Login
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <div
                  onClick={(e) => {
                    redirect("/register");
                  }}
                  className="dropdown-item"
                >
                  Register
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ToggleLoginBtn;
