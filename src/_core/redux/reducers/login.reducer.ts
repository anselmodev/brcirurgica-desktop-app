import { LoginAction, SET_LOGIN, LoginStore } from "_core/redux/types";

const pageState: LoginStore = {
  data: { user: "", password: "", dateLogin: "", expireOn: "" }
};

export function reducerLogin(state = pageState, action: LoginAction) {
  switch (action.type) {
    case SET_LOGIN:
      const { user, password, dateLogin, expireOn } = action.payload;

      return {
        ...state,
        data: {
          user,
          password,
          dateLogin,
          expireOn
        }
      };

    default:
      return state;
  }
}
