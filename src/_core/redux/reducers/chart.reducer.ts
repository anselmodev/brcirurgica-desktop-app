import { DATA_CHART, ChartAction, ChartStore } from "../types";

const pageState: ChartStore = {
  data: {
    open: false,
    type: "",
    elementClassId: ""
  }
};

export function reducerCharts(state = pageState, action: ChartAction) {
  switch (action.type) {
    case DATA_CHART:
      return {
        ...state,
        data: {
          open: action.payload.open || false,
          type: action.payload.type || "",
          elementClassId: action.payload.elementClassId || "",
          icon: action.payload.icon || ""
        }
      };
    default:
      return state;
  }
}
