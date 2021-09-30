import { APIs } from '../helpers/url';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS } from './actionTypes';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIs.userFriends(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        dispatch(fetchFriendsSucces(data.data.friends));
      });
  };
}

export function fetchFriendsSucces(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}
