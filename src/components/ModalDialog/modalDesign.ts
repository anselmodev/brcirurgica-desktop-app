export const modalBg = ( modalType: string ) => {
  return modalType === "info"
  ? "#ecf9ff"
  : modalType === "confirm"
  ? "#f3ecff"
  : modalType === "success"
  ? "#e1f8ec"
  : modalType === "warn"
  ? "#fff7e4"
  : modalType === "err"
  ? "#fff0f0"
  : "#FFFFFF";
};

export const modalIconColor = ( modalType: string ) => {
  return modalType === "info"
  ? "#80c7e8"
  : modalType === "confirm"
  ? "#c0a7ec"
  : modalType === "success"
  ? "#73dca5"
  : modalType === "warn"
  ? "#ffca28"
  : modalType === "err"
  ? "#f99999"
  : "#FFFFFF";
};

export const modalIcon = ( modalType: string ) => {
  return modalType === "info"
  ? "info-circle"
  : modalType === "confirm"
  ? "question-circle"
  : modalType === "success"
  ? "check-circle-o"
  : modalType === "warn"
  ? "exclamation-circle"
  : modalType === "err"
  ? "exclamation-circle"
  : "comment";
};

export const modalBtnColor = ( modalType: string ) => {
  return modalType === "info"
  ? "cyan"
  : modalType === "confirm"
  ? "violet"
  : modalType === "success"
  ? "green"
  : modalType === "warn"
  ? "orange"
  : modalType === "err"
  ? "red"
  : undefined;
};