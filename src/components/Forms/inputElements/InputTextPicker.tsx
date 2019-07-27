import React from "react";
import { InputPicker, Icon } from "rsuite";
import { InputContainer } from "./styles";

interface InputProps {
  data: any;
  label?: string;
  id?: string;
  tip?: string;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  block?: boolean;
  disabledItemValues?: string[];
  groupBy?: string;
  onOpen?: any;
  onChange?: any;
  onClean?: any;
  onSelect?: any;
  sort?: any;
  defaultValue?: any;
  cleanable?: any;
  defaultOpen?: any;
  value?: any;
  valueKey?: any;
  style?: any;
  placement?:
    | "bottomLeft"
    | "bottomRight"
    | "topLeft"
    | "topRight"
    | "leftTop"
    | "rightTop"
    | "leftBottom"
    | "rightBottom"
    | "auto"
    | "autoVerticalLeft"
    | "autoVerticalRight"
    | "autoHorizontalTop"
    | "autoHorizontalBottom";
}

export const InputTextPicker = ({
  label,
  id,
  tip,
  errorMessage,
  required,
  data,
  placeholder,
  disabled,
  searchable,
  block,
  disabledItemValues,
  groupBy,
  onOpen,
  onChange,
  onClean,
  onSelect,
  sort,
  defaultValue,
  cleanable,
  defaultOpen,
  value,
  valueKey,
  style,
  placement
}: InputProps) => {
  return (
    <InputContainer>
      <span className="input-title">
        {required && <Icon icon="circle" className="input-icon-required" />}{" "}
        {label}
      </span>
      <small className="input-tips">{tip}</small>
      <InputPicker
        className="input-form-size"
        label={label}
        id={id}
        tip={tip}
        required={required}
        data={data}
        placeholder={placeholder}
        disabled={disabled}
        searchable={searchable}
        block={block}
        disabledItemValues={disabledItemValues}
        groupBy={groupBy}
        onOpen={onOpen}
        onChange={onChange}
        onClean={onClean}
        onSelect={onSelect}
        sort={sort}
        defaultValue={defaultValue}
        cleanable={cleanable}
        defaultOpen={defaultOpen}
        value={value}
        valueKey={valueKey}
        style={style}
        placement={placement}
      />
      {errorMessage && (
        <div className="input-error-msg">
          <Icon icon="exclamation" className="icon-error-opac" /> {errorMessage}
        </div>
      )}
    </InputContainer>
  );
};
