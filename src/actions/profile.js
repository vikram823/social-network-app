import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILED,
  USER_PROFILE_SUCCESS,
} from "./actionTypes";

import { APIs } from "../helpers/url";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function UserProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function UserProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILED,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = APIs.userProfile(userId);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(UserProfileSuccess(data.data.user));
      });
  };
}
