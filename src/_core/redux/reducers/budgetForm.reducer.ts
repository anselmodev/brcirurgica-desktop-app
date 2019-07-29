import { TOGGLE_BUDGET_FORM, RESULT_BUDGET_FORM, BudgetAction, BudgetStore } from "_core/redux/types";

const budgetState: BudgetStore = {
  data: {
    open: false,
    number: null,
    modified: false,
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
        }
      };
    case RESULT_BUDGET_FORM:
      return {
        ...state,
        data: {
          ...state.data,
          number: action.payload.number || state.data.number,
          modified: action.payload.modified || state.data.modified,
        }
      };
    default:
      return state;
  }
}
