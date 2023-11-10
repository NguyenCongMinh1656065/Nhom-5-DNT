import { useNavigate } from "react-router";
import style from "./error.module.css";
function ServerError() {
  const redirect = useNavigate();
  return (
    <>
      <div className={`${style.unauth}`}>
        <div className="container">
          <div className="row d-flex justify-content-center flex-column">
            <div className="col-12">
              <h1 className="text-danger">Opp! 505</h1>
              <p>
                Our server is <span className="text-danger">dumped</span>.
              </p>
            </div>
            <div className="row gap-2">
              <div className="col-sm-12 col-md-5 ">
                <button
                  className="btn btn-danger w-100"
                  onClick={(e) => {
                    redirect("/login");
                  }}
                >
                  Try Login
                </button>
              </div>
              <div className="col-sm-12 col-md-7 ">
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={(e) => {
                    localStorage.removeItem("user");
                    redirect("/");
                  }}
                >
                  Continue without login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServerError;
