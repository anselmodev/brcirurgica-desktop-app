import React from "react";
import { DatePicker, Icon } from "rsuite";
import { InputContainer } from "./styles";

import pickeLocale from "../jsonFiles/datepicker-locale.json";

interface InputProps {
  label?: string;
  id?: string;
  tip?: string;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  block?: boolean;
  oneTap?: boolean;
  onChange?: any;
  onChangeCalendarDate?: any;
  ranges?: any;
  defaultValue?: any;
  format?: string;
  appearance?: "default" | "subtle";
  calendarDefaultDate?: any;
  cleanable?: any;
  defaultOpen?: any;
  value?: any;
  style?: any;
}

export const InputDatePicker = ({
  label,
  id,
  tip,
  errorMessage,
  required,
  placeholder,
  disabled,
  format,
  block,
  oneTap,
  onChange,
  onChangeCalendarDate,
  defaultValue,
  appearance,
  calendarDefaultDate,
  cleanable,
  defaultOpen,
  value,
  style
}: InputProps) => {
  return (
    <InputContainer>
      <span className="input-title">
        {required && <Icon icon="circle" className="input-icon-required" />}{" "}
        {label}
      </span>
      <small className="input-tips">{tip}</small>
      <DatePicker
        id={id}
        className="input-form-size"
        format={format}
        placeholder={placeholder}
        locale={pickeLocale}
        disabled={disabled}
        block={block}
        oneTap={oneTap}
        onChange={onChange}
        onChangeCalendarDate={onChangeCalendarDate}
        defaultValue={defaultValue}
        appearance={appearance}
        calendarDefaultDate={calendarDefaultDate}
        cleanable={cleanable}
        defaultOpen={defaultOpen}
        value={value}
        style={style}
      />
      {errorMessage && (
        <div className="input-error-msg">
          <Icon icon="exclamation" className="icon-error-opac" /> {errorMessage}
        </div>
      )}
    </InputContainer>
  );
};
