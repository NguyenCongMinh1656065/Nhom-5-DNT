import { useEffect, useRef, useState } from "react";
import PasswordInput from "../ValidInput/PasswordInput";
import ValidInput from "../ValidInput/ValidInput";
import { RegisterState, RegisterStateUnit } from "../RegisterForm/RegisterForm";
import { checkPassword } from "../../utilities/utils";
import { SHA256 } from "crypto-js";

export type ChangpassState = Partial<RegisterState> & {
  newpassword: RegisterStateUnit;
};
function ChangepassBox() {
  const [state, setState] = useState({
    password: {
      value: "",
      isValid: undefined,
    },
    retypepassword: {
      value: "",
      isValid: undefined,
    },
    newpassword: {
      value: "",
      isValid: undefined,
    },
  } as ChangpassState);
  const isFilled = useRef<boolean | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    isFilled.current =
      state.password?.value != "" &&
      state.retypepassword?.isValid &&
      state.newpassword?.isValid;
  });
  return (
    <form method="post">
      <div className="">
        <label className="form-label" htmlFor="changepass">
          Enter your password
        </label>
        <PasswordInput
          callBack={(e) => {
            setIsError(false);
            setState({
              ...state,
              password: {
                value: e,
                isValid: e == "" ? undefined : checkPassword(e),
              },
            });
          }}
          identifier="changepass"
        />
      </div>
      <div className="">
        <label className="form-label" htmlFor="newpass">
          Enter new password
        </label>
        <PasswordInput
          callBack={(e) => {
            setIsError(false);

            setState({
              ...state,
              newpassword: {
                value: e,
                isValid: e == "" ? undefined : checkPassword(e),
              },
            });
          }}
          isValid={state.newpassword.isValid}
          identifier="newpass"
          textIfInvalid="Password must include numbers, text and special characters."
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="confirmnewpass">
          Confirm new password
        </label>
        <PasswordInput
          callBack={(e) => {
            setIsError(false);
            setState({
              ...state,
              retypepassword: {
                value: e,
                isValid:
                  e == ""
                    ? undefined
                    : checkPassword(e) && e == state.newpassword.value,
              },
            });
          }}
          isValid={state.retypepassword?.isValid}
          identifier="confirmnewpass"
          textIfInvalid="Password is not match"
        />
      </div>
      {isError && (
        <div>
          <div className="alert alert-warning alert-sm">
            {isFilled.current == undefined
              ? "You must input all fields."
              : isFilled.current == false
              ? "Please enter a valid password."
              : ""}
          </div>
        </div>
      )}
      {isPasswordChange == true ? (
        <div>
          <div className="alert alert-success alert-sm">Password changed!</div>
        </div>
      ) : isPasswordChange == false ? (
        <div>
          <div className="alert alert-danger alert-sm">
            Your password is not correct.
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (!isPending) {
              if (!isFilled.current == true) {
                setIsError(true);
                return;
              }
              const userInfo = JSON.parse(localStorage.getItem("user") || "{}");

              setIsError(false);
              setIsPending(true);
              setIsPasswordChange(undefined);
            }
          }}
          className="btn btn-outline-danger btn-sm w-100"
        >
          Change{" "}
          {isPending && (
            <div
              className="spinner-border spinner-border-sm text-secondary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </div>
    </form>
  );
}

export default ChangepassBox;
