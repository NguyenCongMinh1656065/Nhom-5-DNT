import React, { useEffect, useMemo, useState } from "react";
import ValidInput from "../ValidInput/ValidInput";
import style from "./registerform.module.css";
import sha256 from "crypto-js/sha256";
import {
  checkEmail,
  checkPassword,
  checkPhonenumber,
} from "../../utilities/utils";
import PasswordInput from "../ValidInput/PasswordInput";
import { useNavigate } from "react-router";
export type RegisterStateUnit = {
  value: string;
  isValid?: boolean | undefined;
};
export type RegisterState = {
  fullname: RegisterStateUnit;
  username: RegisterStateUnit;
  password: RegisterStateUnit;
  retypepassword: RegisterStateUnit;
  email: RegisterStateUnit;
  phonenumber: RegisterStateUnit;
};
const initialState: RegisterState = {
  fullname: {
    value: "",
    isValid: undefined,
  },
  username: {
    value: "",
    isValid: undefined,
  },
  password: {
    value: "",
    isValid: undefined,
  },
  email: {
    value: "",
    isValid: undefined,
  },

  retypepassword: {
    value: "",
    isValid: undefined,
  },

  phonenumber: {
    value: "",
    isValid: undefined,
  },
};

function RegisterForm() {
  const [stateForm, setStateForm] = useState(initialState);
  const [isReadyToRegister, setIsReadyToRegister] = useState<
    boolean | undefined
  >(undefined);
  const redirect = useNavigate();
  useEffect(() => {
    const entries = Object.entries(stateForm);
    for (let i of entries) {
      if (i[1].isValid == false || i[1].value == "") {
        setIsReadyToRegister(false);
        return;
      }
    }
    setIsReadyToRegister(true);
  });

  return (
    <form id="registerform" className={`container p-3 ${style.margin}`}>
      <div>
        <img src="" alt="" />
        <h2>Register now!</h2>
      </div>
      <hr />
      <div>
        <label className="required" htmlFor="fullname">
          Full name
        </label>
        <ValidInput
          callBack={(value) => {
            setStateForm((pre) =>
              updateField(pre, {
                fullname: {
                  value,
                },
              })
            );
          }}
          identifier="fullname"
        />
      </div>
      <div>
        <label htmlFor="username" className="required">
          Username
        </label>
        <ValidInput
          callBack={async (value) => {
            const hashedUsername = sha256(value).toString();
          }}
          textIfInvalid={
            stateForm.username.value.length <= 10
              ? "Username must have more than 10 characters."
              : "This username has already exist."
          }
          identifier="username"
          isValid={stateForm.username.isValid}
        />
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="password" className="required">
            Password
          </label>
          <PasswordInput
            callBack={(value) => {
              setStateForm((pre) =>
                updateField(pre, {
                  password: {
                    value,
                    isValid: value == "" ? undefined : checkPassword(value),
                  },
                })
              );
            }}
            textIfInvalid="Password must include text, numbers and special characters."
            isValid={stateForm.password.isValid}
            identifier="password"
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label className="required" htmlFor="retypepassword">
            Retype Password
          </label>
          <PasswordInput
            callBack={(value) => {
              setStateForm((pre) =>
                updateField(pre, {
                  retypepassword: {
                    value,
                    isValid:
                      value == ""
                        ? undefined
                        : checkPassword(value) &&
                          value == stateForm.password.value,
                  },
                })
              );
            }}
            identifier="retypepassword"
            textIfInvalid="Your password does not match."
            isValid={stateForm.retypepassword.isValid}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="email">Email</label>
          <ValidInput
            callBack={(value) => {
              setStateForm((pre) =>
                updateField(pre, {
                  email: {
                    value,
                    isValid: value == "" ? undefined : checkEmail(value),
                  },
                })
              );
            }}
            textIfInvalid="This pattern does not seem to be a valid email"
            identifier="email"
            isValid={stateForm.email.isValid}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="phonenumber">Phone number</label>
          <ValidInput
            callBack={(value) => {
              setStateForm((pre) =>
                updateField(pre, {
                  phonenumber: {
                    value,
                    isValid: value == "" ? undefined : checkPhonenumber(value),
                  },
                })
              );
            }}
            identifier="phonenumber"
            textIfInvalid="This phonenumber does not valid in current country."
            isValid={stateForm.phonenumber.isValid}
          />
        </div>
      </div>
      <hr className="my-4" />
      <div className="d-flex justify-content-between">
        <button
          disabled={
            isReadyToRegister == false
              ? true
              : isReadyToRegister == true
              ? false
              : undefined
          }
          onClick={(e) => {
            if (!isReadyToRegister) {
              e.preventDefault();
            } else {
              onSubmit(stateForm, redirect)(e);
            }
          }}
          className={`btn btn-primary w-25`}
        >
          Ok
        </button>
        <a href="/login">Back to login</a>
      </div>
    </form>
  );
}

function updateField(state: RegisterState, field: Partial<RegisterState>) {
  return {
    ...state,
    ...field,
  };
}

function onSubmit(state: RegisterState, redirect: (url: string) => void) {
  return async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    const body = {
      username: sha256(state.username.value).toString(),
      fullname: state.fullname.value,
      password: sha256(state.password.value).toString(),
      email: state.email.value,
      phonenumber: state.phonenumber.value,
    };
  };
}

export default RegisterForm;
