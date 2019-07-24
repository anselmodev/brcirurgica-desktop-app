import styled from "styled-components";

export const ModalDialogBg = styled.div<{ color: string }>(props => ({
  width: "100%",
  height: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 0,
  backgroundColor: props.color,
  borderRadius: 6
}));

export const IconModal = styled.p<{ color: string }>(props => ({
  position: "absolute",
  top: "calc(50% + 3px)",
  left: "50%",
  zIndex: 1,
  transform: "scale(14)",
  opacity: 0.1,
  color: props.color
}));
