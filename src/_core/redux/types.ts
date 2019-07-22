export const SET_PAGE_ROUTE = "SET_PAGE_ROUTE";
export const SET_LOGIN = "SET_LOGIN";
export const DATA_CHART = "GET_DATA_CHART";

/* PAGE */
export interface PageStore {
  data: {
    title: string;
    url: string;
    param?: {};
    hash?: string[];
  };
}
export interface PageAction {
  type: typeof SET_PAGE_ROUTE;
  payload: {
    title: string;
    location: any;
  };
}

/* LOGIN */
export interface LoginStore {
  data: {
    user: string;
    password: string;
    dateLogin: string;
    expireOn: string;
  };
}
export interface LoginAction {
  type: typeof SET_LOGIN;
  payload: LoginStore["data"];
}
/* CHART HOME */
export interface ChartStore {
  data: {
    open: boolean;
    type?: string;
    elementClassId?: string;
    icon?: string;
  };
}
export interface ChartAction {
  type: typeof DATA_CHART;
  payload: ChartStore["data"];
}
