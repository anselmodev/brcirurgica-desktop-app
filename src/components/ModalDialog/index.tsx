import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Icon } from "rsuite";
import { ModalDialogBg, IconModal } from "./styles";
import { audioPlayer } from "../../_core/helpers/audioPlayer";
import { modalDialogAction } from "../../_core/redux/actions";
import {
  modalBg,
  modalIcon,
  modalBtnColor,
  modalIconColor
} from "./modalDesign";

const _styleFixt: any = {
  position: "relative",
  zIndex: 1
};
const audioAlert = (type?: string) => {
  switch (type) {
    case "info":
      audioPlayer("pop1");
      break;
    case "confirm":
      audioPlayer("confirm");
      break;
    case "warn":
      audioPlayer("open");
      break;
    case "err":
      audioPlayer("error");
      break;
    case "success":
      audioPlayer("success");
      break;

    default:
      audioPlayer("pop1");
      break;
  }
};

export const ModalDialog = () => {
  const dispatch = useDispatch();
  const {
    open,
    title,
    size,
    content,
    buttons,
    backdrop,
    type,
    fullscreen,
    overflow
  } = useSelector((state: any) => state.modalDialog.data);

  const modalClose = () => {
    dispatch(
      modalDialogAction({
        title,
        size,
        content,
        buttons,
        backdrop,
        type,
        fullscreen,
        overflow,
        open: false
      })
    );
  };
  const modalResetData = () => {
    dispatch(modalDialogAction({ open: false }));
  };
  return (
    <Modal
      show={open}
      backdrop={backdrop}
      size={size}
      fullscreen={fullscreen}
      overflow={overflow}
      onExited={modalResetData}
      onEnter={() => audioAlert(type)}
    >
      <ModalDialogBg color={modalBg(type)} />
      <IconModal color={modalIconColor(type)}>
        {type && <Icon icon={modalIcon(type)} />}
      </IconModal>
      <Modal.Header closeButton={false} style={_styleFixt}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={_styleFixt}>{content}</Modal.Body>
      <Modal.Footer style={_styleFixt}>
        {buttons.map((item: any) => {
          return (
            <Button
              key={item.label}
              onClick={() => {
                item.action && item.action();
                modalClose();
              }}
              appearance={item.appearance || "subtle"}
              color={modalBtnColor(type)}
            >
              {item.label}
            </Button>
          );
        })}
      </Modal.Footer>
    </Modal>
  );
};
