import {
  TOGGLE_BUDGET_FORM,
  RESULT_BUDGET_FORM,
  BudgetAction,
  BudgetStore
} from "_core/redux/types";

const budgetState: BudgetStore = {
  data: {
    open: false,
    number: null,
    dataBudget: {}
  }
};

export function reducerBudgetForm(state = budgetState, action: BudgetAction) {
  switch (action.type) {
    case TOGGLE_BUDGET_FORM:
      if (action.payload.open) {
        return {
          ...state,
          data: {
            ...state.data,
            open: action.payload.open,
            number: action.payload.number || null
          }
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            open: false,
            number: null,
            dataBudget: {}
          }
        };
      }

    case RESULT_BUDGET_FORM:
      // update budget data
      if (action.payload.dataBudget) {
        return {
          ...state,
          data: {
            ...state.data,
            dataBudget: {
              ...state.data.dataBudget,
              ...action.payload.dataBudget
            }
          }
        };
      } 
      // update quantity and price product
      else if (action.payload.productQuantityUpdate) {
        const updateProducts = [...state.data.dataBudget.os_products];
        updateProducts[action.payload.productQuantityUpdate[0]] =
          action.payload.productQuantityUpdate[1];

        return {
          ...state,
          data: {
            ...state.data,
            dataBudget: {
              ...state.data.dataBudget,
              os_products: updateProducts
            }
          }
        };
      } 
      // add or remove customer data
      else if (action.payload.osCustomer) {
      } 
      // add or remove products from budget
      else if (action.payload.osProdOrigin) {
      }
      // Result calc: 
      // total-general, total-discount, tax-price, parcel-price, total commission
      else if (action.payload.totalCalculate) {
      }
      break;
    default:
      return state;
  }
}
