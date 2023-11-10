import React, { useEffect, useState } from "react";
import LabeledInput from "../ValidInput/LabeledInput";
import style from "./loginform.module.css";
import { Navigate, redirect, useNavigate } from "react-router";
import sha256 from "crypto-js/sha256";
import LoadingView from "../LoadingView/LoadingView";
import PasswordInput from "../ValidInput/PasswordInput";
import { User, useUser } from "../../contexts/UserContext/UserContext";
import { GET_USER_BY_ID, LOGIN } from "../../env";

export function LoginForm() {
  const [user, setUser] = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [isRequired, setIsRequired] = useState<undefined | boolean>(undefined);
  const navigate = useNavigate();

  return (
    <div className={`${style.wrapper}`}>
      <div className={`${style.login}`}>
        <h2>Login</h2>
        <div>
          <LabeledInput
            identifier="username"
            placeholder="Username"
            type="text"
            callBack={(value) => {
              setUsername(value);
              setIsRequired(undefined);
            }}
            className={[style["top-border"]]}
            delay={0}
          />
          <PasswordInput
            identifier="password"
            placeholder="Password"
            callBack={(value) => {
              setIsRequired(undefined);
              setPassword(value);
            }}
            className={[style["bottom-border"], "p-3"]}
            delay={0}
          />
        </div>

        {isRequired && (
          <div className="alert alert-secondary">
            Username and Password are required.
          </div>
        )}

        {loginFail && (
          <div className="alert alert-secondary">
            Username or Password are not correct.
          </div>
        )}
        <div className="d-flex justify-content-between">
          <span>Forgot your password?</span>
          <span>
            <a href="">change</a>
          </span>
        </div>
        {logging ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button
            onClick={(e) => {
              if (username.trim() == "" || password.trim() == "") {
                setIsRequired(true);
              } else {
                setLogging(true);
                login({ username, password })
                  .then(async (res) => {
                    if (res.ok) {
                      const response = await res.json();
                      const id = response.currentId;
                      const user = await (await getUser(id)).json();
                      localStorage.setItem("user", JSON.stringify(user));
                      setUser(user as User);
                      navigate("/products");
                    } else {
                      setLoginFail(true);
                      setTimeout(() => {
                        setLoginFail(false);
                      }, 3000);
                    }
                  })
                  .catch((err) => {
                    setLoginFail(true);
                  })
                  .finally(() => {
                    setLogging(false);
                  });
              }
            }}
            className="btn btn-primary"
          >
            Login
          </button>
        )}
        <a href="/register" className="btn btn-outline-secondary">
          Or Sign up
        </a>
        <div className="text-secondary">
          @copyright: {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

function login({ username, password }: { username: string; password: string }) {
  return fetch(LOGIN, {
    method: "POST",
    body: JSON.stringify({ userName: username, password: password }),
    headers: { "Content-Type": "application/problem+json; charset=utf-8" },
  });
}

function getUser(id: number) {
  return fetch(GET_USER_BY_ID + id + "?id=" + id);
}
