import { useState } from "react";
import styles from "./FormInput.module.css";

interface FormProps {
  label: string;
  errorMessage: string;
  onChange: (value: string) => void;
  id: number;
  value: string;
  name: string;
  type: string;
  placeholder: string;
  pattern?: string | ((value: string) => string);
  required?: boolean;
}

const FormInput = (props: FormProps) => {
  const [focused, setFocused] = useState(false);
  const {
    label,
    errorMessage,
    onChange,
    value,
    name,
    type,
    placeholder,
    pattern,
    required,
  } = props;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        pattern={typeof pattern === "function" ? pattern(value) : pattern}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        onBlur={handleFocus}
        {...(focused ? { focused: "true" } : {})}
      />
      <span className={styles.error}>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
