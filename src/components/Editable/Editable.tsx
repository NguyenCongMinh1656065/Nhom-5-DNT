import { useEffect, useRef, useState } from "react";
import style from "./editable.module.css";
import ValidInput from "../ValidInput/ValidInput";
import { SelectBoxProps } from "../SelectBox/SelectBox";
import { SelectOptionProps } from "../../utilities/utils";

type EditableProps = {
  onChange?: (e: string) => void;
  type: string;
  value?: string;
  values?: SelectOptionProps[];
  canEdit: boolean;
  name?: string;
};

function Editable({
  onChange,
  type,
  value,
  name,
  canEdit,
  values,
}: EditableProps) {
  const [txtvalue, setTxtValue] = useState(value || "");
  const [disableText, setDisableText] = useState(true);
  return (
    <>
      <div className={`${style.editable}`}>
        <ValidInput
          callBack={(e) => {
            if (onChange) {
              onChange(e);
            }
          }}
          values={values}
          initialValue={value}
          onBlur={(e) => {
            setDisableText(true);
          }}
          disabled={canEdit == false ? true : disableText}
          type={type ?? "text"}
          identifier={name ?? ""}
        />
        {canEdit == true && disableText && (
          <svg
            className={`${style.icon} bi bi-pencil-square`}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={(e) => {
              e.stopPropagation();
              setDisableText(false);
            }}
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        )}
      </div>
    </>
  );
}

export default Editable;
