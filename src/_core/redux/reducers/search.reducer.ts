import { TOGGLE_SEARCH, RESULT_SEARCH, SearchAction, SearchStore } from "_core/redux/types";

const searchState: SearchStore = {
  data: {
    open: false,
    filter: "Orçamentos",
    result: []
  }
};

export function reducerSearch(state = searchState, action: SearchAction) {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return {
        ...state,
        data: {
          ...state.data,
          open: action.payload.open || false
        }
      };
    case RESULT_SEARCH:
      return {
        ...state,
        data: {
          ...state.data,
          filter: action.payload.filter || "Orçamentos",
          result: action.payload.result || []
        }
      };
    default:
      return state;
  }
}
