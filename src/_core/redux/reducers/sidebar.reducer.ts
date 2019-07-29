import { TOGGLE_SIDEBAR, SidebarAction, SidebarStore } from "_core/redux/types";

const pageState: SidebarStore = {
  data: {
    open: false,
    section: "",
    subSection: ""
  }
};

export function reducerSidebar(state = pageState, action: SidebarAction) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        data: {
          open: action.payload.open || false,
          section: action.payload.section || "",
          subSection: action.payload.subSection || ""
        }
      };
    default:
      return state;
  }
}
