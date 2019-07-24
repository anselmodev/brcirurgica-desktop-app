import { TOGGLE_LOCK_SCREEN, LockScreenAction, LockScreenStore } from "../types";

const lockScreenState: LockScreenStore = {
  data: {
    locked: false,
  }
};

export function reducerLockscreen(state = lockScreenState, action: LockScreenAction) {
  switch (action.type) {
    case TOGGLE_LOCK_SCREEN:
      return {
        ...state,
        data: {
          locked: action.payload.locked
        }
      };
    default:
      return state;
  }
}
