import {
  TOGGLE_SIDEBAR,
  TOGGLE_MODAL_DIALOG,
  TOGGLE_LOCK_SCREEN,
  TOGGLE_SEARCH,
  RESULT_SEARCH,
  TOGGLE_BUDGET_FORM,
  RESULT_BUDGET_FORM,
  SET_LOGIN,
  SET_PAGE_ROUTE,
  DATA_CHART,
  SidebarAction,
  LoginAction,
  PageAction,
  ChartAction,
  ModalDialogAction,
  LockScreenAction,
  SearchAction,
  BudgetAction
} from "_core/redux/types";

export function setLoginAction(payload: LoginAction["payload"]) {
  return {
    type: SET_LOGIN,
    payload
  };
}

export function setPageAction(payload: PageAction["payload"]) {
  return {
    type: SET_PAGE_ROUTE,
    payload
  };
}

export function chartAction(payload?: ChartAction["payload"]) {
  return {
    type: DATA_CHART,
    payload
  };
}

export function sidebarAction(payload?: SidebarAction["payload"]) {
  return {
    type: TOGGLE_SIDEBAR,
    payload
  };
}
export function modalDialogAction(payload?: ModalDialogAction["payload"]) {
  return {
    type: TOGGLE_MODAL_DIALOG,
    payload
  };
}
export function lockScreenAction(payload?: LockScreenAction["payload"]) {
  return {
    type: TOGGLE_LOCK_SCREEN,
    payload
  };
}
export function toggleSearchAction(payload?: SearchAction["payload"]) {
  return {
    type: TOGGLE_SEARCH,
    payload
  };
}
export function resultSearchAction(payload?: SearchAction["payload"]) {
  return {
    type: RESULT_SEARCH,
    payload
  };
}
export function toggleBudgetAction(payload?: BudgetAction["payload"]) {
  return {
    type: TOGGLE_BUDGET_FORM,
    payload
  };
}
export function resultBudgetAction(payload?: BudgetAction["payload"]) {
  return {
    type: RESULT_BUDGET_FORM,
    payload
  };
}
