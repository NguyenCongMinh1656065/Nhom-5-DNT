import { useNavigate } from "react-router";
import style from "./error.module.css";
function Unauthenticated() {
  const redirect = useNavigate();
  return (
    <>
      <div className={`${style.unauth}`}>
        <div className="container">
          <div className="row d-flex justify-content-center flex-column">
            <div className="col-12">
              <h3 className="text-danger">Opp!</h3>
              <p>You're not authenticated to access this information.</p>
            </div>
            <div className="">
              <button
                className="col-3 btn btn-danger"
                onClick={(e) => {
                  redirect("/login");
                }}
              >
                Login
              </button>
              <button
                className="ms-3 btn btn-outline-danger"
                onClick={(e) => {
                  localStorage.removeItem("user");
                  redirect("/");
                }}
              >
                Or continue without login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Unauthenticated;
