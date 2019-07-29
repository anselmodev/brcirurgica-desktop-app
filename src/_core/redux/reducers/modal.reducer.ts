import {
  TOGGLE_MODAL_DIALOG,
  ModalDialogAction,
  ModalDialogStore
} from "_core/redux/types";

const modalState: ModalDialogStore = {
  data: {
    open: false,
    type: "",
    title: "",
    content: "",
    size: undefined,
    fullscreen: false,
    overflow: false,
    backdrop: "static",
    buttons: []
  }
};

export function reducerModal(state = modalState, action: ModalDialogAction) { 
  switch (action.type) {
    case TOGGLE_MODAL_DIALOG:
      return {
        ...state,
        data: {
          open: action.payload.open || false,
          type: action.payload.type || "",
          title: action.payload.title || "",
          content: action.payload.content || "",
          size: action.payload.size || undefined,
          fullscreen: action.payload.fullscreen || false,
          overflow: action.payload.overflow || false,
          backdrop: action.payload.backdrop !== undefined ? action.payload.backdrop : "static",
          buttons: action.payload.buttons || []
        }
      };
    default:
      return state;
  }
}
