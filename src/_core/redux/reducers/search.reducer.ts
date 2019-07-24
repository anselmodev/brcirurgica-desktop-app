import { TOGGLE_SEARCH, SearchAction, SearchStore } from "../types";

const searchState: SearchStore = {
  data: {
    open: false,
    filter: "os",
    result: []
  }
};

export function reducerSearch(state = searchState, action: SearchAction) {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return {
        ...state,
        data: {
          open: action.payload.open,
          filter: action.payload.filter || "os",
          result: action.payload.result || []
        }
      };
    default:
      return state;
  }
}
