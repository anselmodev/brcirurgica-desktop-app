import { TOGGLE_BUDGET_FORM, RESULT_BUDGET_FORM, BudgetAction, BudgetStore } from "../types";

const budgetState: BudgetStore = {
  data: {
    open: false,
    number: null,
    modified: false,
    result: []
  }
};

export function reducerBudgetForm(state = budgetState, action: BudgetAction) {
  switch (action.type) {
    case TOGGLE_BUDGET_FORM:
      return {
        ...state,
        data: {
          ...state.data,
          open: action.payload.open || false,
          number: action.payload.number || null,
          modified: action.payload.modified || false,
          result: action.payload.result || []
        }
      };
    case RESULT_BUDGET_FORM:
      return {
        ...state,
        data: {
          ...state.data,
          number: action.payload.number || state.data.number,
          modified: action.payload.modified || state.data.modified,
          result: action.payload.result || state.data.result
        }
      };
    default:
      return state;
  }
}
