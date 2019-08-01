import React, { useMemo } from "react";
import { Input, Icon } from "rsuite";
import { InputContainer } from "./styles";

interface InputProps {
  label?: string;
  id?: string;
  tip?: string;
  errorMessage?: string;
  required?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  placeholder?: string;
  disabled?: boolean;
  onChange?: any;
  type?: string;
  defaultValue?: any;
  value?: any;
  style?: any;
  componentClass?: any
  onBlur?: any
}

export const InputText = ({
  id,
  label,
  tip,
  errorMessage,
  required,
  placeholder,
  defaultValue,
  componentClass,
  disabled,
  onChange,
  size,
  type,
  value,
  style,
  onBlur
}: InputProps) => {

  const MemoInputText = useMemo(() =>
    <InputContainer>
      <span className="input-title">
        {required && <Icon icon="circle" className="input-icon-required" />}{" "}
        {label}
      </span>
      <small className="input-tips">{tip}</small>
      <Input
        id={id}
        className="input-form-size"
        componentClass={componentClass}
        defaultValue={defaultValue}
        value={value}
        size={size}
        type={type}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        onBlur={onBlur}
      />
      {errorMessage && (
        <div className="input-error-msg">
          <Icon icon="exclamation" className="icon-error-opac" />{" "}
          {errorMessage}
        </div>
      )}
    </InputContainer>, [
      id,
      label,
      tip,
      errorMessage,
      required,
      placeholder,
      defaultValue,
      componentClass,
      disabled,
      onChange,
      size,
      type,
      value,
      style,
      onBlur
    ]);

  return MemoInputText
};
