import {
  SET_LOGIN,
  SET_PAGE_ROUTE,
  DATA_CHART,
  LoginAction,
  PageAction,
  ChartAction
} from "../types";

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
