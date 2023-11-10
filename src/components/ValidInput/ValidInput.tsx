import { useState } from "react";
import { useDebounce } from "../../utilities/debounce";
import React from "react";
import { SelectOptionProps } from "../../utilities/utils";

export type ValidInputProps = {
  style?: {};
  type?: string;
  className?: string[];
  callBack: (text: string) => void;
  isValid?: boolean;
  identifier?: string;
  placeholder?: string;
  delay?: number;
  textIfInvalid?: string;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  initialValue?: string;
  values?: SelectOptionProps[];
  disabled?: boolean;
};

function ValidInput(props: ValidInputProps) {
  const [state, setState] = useState(props.initialValue || "");
  const debounce = useDebounce((value) => {
    props.callBack(value);
  }, props.delay ?? 500);

  return (
    <>
      {props.values ? (
        <select
          disabled={props.disabled || false}
          value={state}
          onChange={(e) => {
            debounce(e.target.value);
            setState(e.target.value);
          }}
          id={props.identifier ?? ""}
          name={props.identifier ?? ""}
          placeholder={props.placeholder ?? ""}
          className={`form-select ${props.className?.join(" ")} ${
            props.isValid == undefined
              ? ""
              : props.isValid == true
              ? "is-valid"
              : "is-invalid"
          }`}
          defaultValue={props.initialValue}
          onBlur={(e) => {
            if (props.onBlur) {
              props.onBlur(e);
            }
          }}
        >
          {props.values.map((v, index) => (
            <option
              key={index}
              selected={v.key == props.initialValue}
              value={v.key}
            >
              {v.text}
            </option>
          ))}
        </select>
      ) : (
        <input
          disabled={props.disabled || false}
          value={state}
          onChange={(e) => {
            debounce(e.target.value);
            setState(e.target.value);
          }}
          id={props.identifier ?? ""}
          name={props.identifier ?? ""}
          placeholder={props.placeholder ?? ""}
          type={props.type || "text"}
          className={`form-control ${props.className?.join(" ")} ${
            props.isValid == undefined
              ? ""
              : props.isValid == true
              ? "is-valid"
              : "is-invalid"
          }`}
          onBlur={(e) => {
            if (props.onBlur) {
              props.onBlur(e);
            }
          }}
        />
      )}
      {props.isValid == false && props.textIfInvalid && (
        <>
          <small className="text-danger">{props.textIfInvalid}</small>
        </>
      )}
    </>
  );
}

export default React.memo(ValidInput);
