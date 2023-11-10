import { useEffect, useRef, useState } from "react";
import style from "./profile.module.css";
import Navbar from "../Navbar/Navbar";
import Editable from "../Editable/Editable";
import { useNavigate } from "react-router";
import LoadingView from "../LoadingView/LoadingView";

import ChangepassBox from "../ChangePass/Changepass";
import { User, useUser } from "../../contexts/UserContext/UserContext";
export type UserInfo = {
  username: string;
  fullname: string;
  email: string | undefined;
  birthday: string | undefined;
  avt: string | undefined;
  phonenumber: string;
  address: string;
};

function Profile() {
  const redirect = useNavigate();
  const [user, setUser] = useUser();

  const [isChecking, setChecking] = useState(true);
  const [userInfo, setUserInfor] = useState({} as UserInfo);
  const [newAvt, setNewAvt] = useState<File>(null!);
  const avtRef = useRef<HTMLImageElement>(null!);
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      {isChecking ? (
        <LoadingView />
      ) : (
        <div className={`container mt-5 d-flex ${style.container}`}>
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <div
              className=" overflow-hidden
                position-relative d-flex justify-content-center align-items-center flex-column"
            >
              <img
                className={`${style.avt} mb-4`}
                src={
                  userInfo.avt ||
                  "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-nhon.jpg"
                }
                ref={avtRef}
                alt="Avatar"
              />
              <div className={`row mb-3 ${style["avt-change-btn"]}`}>
                <label
                  htmlFor="avt"
                  className="form-label text-primary w-100 h-100 d-flex justify-content-center align-items-center"
                ></label>
                <input
                  type="file"
                  className={`${style.hidden}`}
                  name="avt"
                  id="avt"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files) {
                      var reader = new FileReader();

                      reader.onload = function (e) {
                        avtRef.current.setAttribute(
                          "src",
                          e.target?.result as string
                        );
                      };
                      reader.readAsDataURL(e.target.files![0]);
                      setNewAvt(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 p-3">
            <h4 className="text-secondary">Basic information</h4>
            <div className="row mb-3">
              <div className="col-md-6 col-sm-12">
                <label className="form-label" htmlFor="fname">
                  Full name
                </label>
                <Editable
                  onChange={(e) => {
                    setUserInfor({
                      ...userInfo,
                      fullname: e,
                    });
                  }}
                  type="text"
                  value={userInfo.fullname}
                  canEdit={true}
                  name="fname"
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label className="form-label" htmlFor="phonenumber">
                  Phone number
                </label>
                <Editable
                  onChange={(e) => {
                    setUserInfor({
                      ...userInfo,
                      phonenumber: e,
                    });
                  }}
                  type="text"
                  value={userInfo.phonenumber}
                  canEdit={true}
                  name="phonenumber"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="">
                <label className="form-label" htmlFor="birthday">
                  Birthday
                </label>
                <Editable
                  onChange={(value) => {
                    setUserInfor({
                      ...userInfo,
                      birthday: value,
                    });
                  }}
                  type="date"
                  value={userInfo.birthday}
                  canEdit={true}
                  name="birthday"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="">
                <label className="form-label" htmlFor="address">
                  Address
                </label>
                <Editable
                  onChange={(value) => {
                    setUserInfor({
                      ...userInfo,
                      address: value,
                    });
                  }}
                  type="text"
                  value={userInfo.address}
                  canEdit={true}
                  name="address"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <Editable
                  onChange={(e) => {
                    setUserInfor({
                      ...userInfo,
                      email: e,
                    });
                  }}
                  type="text"
                  value={userInfo.email}
                  canEdit={true}
                  name="email"
                />
              </div>
            </div>
            <hr />

            <div className="row mb-3">
              <div className="col">
                <button
                  className="btn btn-black btn-sm w-100"
                  onClick={(e) => {}}
                >
                  Save changes{" "}
                  {isPending && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
            <hr />
            <div className="">
              <h5 className="text-danger">Security</h5>
              <div className="d-flex justify-content-begin align-items-center gap-2 text-danger">
                <label htmlFor="">Change password</label>
                <a
                  className={`${style.link} text-danger`}
                  data-bs-toggle="collapse"
                  href="#collapsechangepassword"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapsechangepassword"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </a>
              </div>
              <div className="collapse mt-3" id="collapsechangepassword">
                <div className="card card-body">
                  <ChangepassBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const changeBasicInfor = function (
  userInfo: any,
  user: User | undefined,
  whenUpdating?: () => void,
  whenUpdated?: () => void
) {
  const formData = new FormData();

  for (let key in userInfo) {
    formData.append(key, (userInfo as any)[key]);
  }
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    if (whenUpdating) {
      whenUpdating();
    }
  };
};

export default Profile;
