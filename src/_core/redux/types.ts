export const SET_PAGE_ROUTE = "SET_PAGE_ROUTE";
export const SET_LOGIN = "SET_LOGIN";
export const DATA_CHART = "GET_DATA_CHART";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_MODAL_DIALOG = "TOGGLE_MODAL_DIALOG";
export const TOGGLE_LOCK_SCREEN = "TOGGLE_LOCK_SCREEN";
export const TOGGLE_SEARCH = "TOGGLE_SEARCH";
export const RESULT_SEARCH = "RESULT_SEARCH";
export const TOGGLE_BUDGET_FORM = "TOGGLE_BUDGET_FORM";
export const RESULT_BUDGET_FORM = "RESULT_BUDGET_FORM";

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

/* TOGGLE SIDEBAR */
export interface SidebarStore {
  data: {
    open: boolean;
    section: string;
    subSection: string;
  };
}
export interface SidebarAction {
  type: typeof TOGGLE_SIDEBAR;
  payload: {
    open: boolean;
    section?: string;
    subSection?: string;
  };
}
/* TOGGLE MODAL DIALOG */
export interface ModalDialogStore {
  data: {
    open: boolean;
    type: string;
    title: string;
    content: any;
    size: string | undefined;
    fullscreen: boolean;
    overflow: boolean;
    backdrop: boolean | string;
    buttons: object[];
  };
}
export interface ModalDialogAction {
  type: typeof TOGGLE_MODAL_DIALOG;
  payload: {
    open?: boolean;
    type?: "info" | "confirm" | "warn" | "err" | "success";
    title?: string;
    content?: any;
    size?: "lg" | "md" | "sm" | "xs";
    fullscreen?: boolean;
    overflow?: boolean;
    backdrop?: boolean | "static";
    buttons?: object[];
  };
}
/* TOGGLE LOCK SCREEN */
export interface LockScreenStore {
  data: {
    locked: boolean;
  };
}
export interface LockScreenAction {
  type: typeof TOGGLE_LOCK_SCREEN;
  payload: LockScreenStore["data"];
}
/* TOGGLE AND RESULT SEARCH */
export interface SearchStore {
  data: {
    open: boolean;
    filter: "Orçamentos" | "Clientes" | "Usuários" | "Produtos";
    result: object[]
  };
}
export interface SearchAction {
  type: typeof TOGGLE_SEARCH | typeof RESULT_SEARCH;
  payload: {
    open?: boolean;
    filter?: "Orçamentos" | "Clientes" | "Usuários" | "Produtos";
    result?: object[]
  };
}
/* TOGGLE AND RESULT BUDGET FORM */
export interface BudgetStore {
  data: {
    open: boolean;
    number: number | null;
    modified: boolean;
    result: object[]
  };
}
export interface BudgetAction {
  type: typeof TOGGLE_BUDGET_FORM | typeof RESULT_BUDGET_FORM;
  payload: {
    open?: boolean;
    number?: number;
    modified?: boolean;
    result?: object[]
  };
}
