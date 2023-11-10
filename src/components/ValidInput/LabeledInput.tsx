import ValidInput, { ValidInputProps } from "./ValidInput";

type LabeledInputProps = ValidInputProps & {
  placeholder: string;
  identifier: string;
  delay?: number;
};

function LabeledInput(props: LabeledInputProps) {
  return (
    <>
      <div className="form-floating">
        <ValidInput
          callBack={props.callBack}
          className={props.className}
          style={props.style}
          type={props.type}
          placeholder={props.placeholder}
          identifier={props.identifier}
          delay={props.delay}
        />
        <label htmlFor={props.identifier}>{props.placeholder}</label>
      </div>
    </>
  );
}

export default LabeledInput;
