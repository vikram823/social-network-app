import { FETCH_USER_PROFILE, USER_PROFILE_FAILED, USER_PROFILE_SUCCESS } from "../actions/actionTypes";

const initialProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false
};

export default function posts(state = initialProfileState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        success: true,
        inProgress: true
      };
    case USER_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true
      };
    default:
      return state;
  }
}
