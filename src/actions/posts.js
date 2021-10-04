import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
} from "./actionTypes";
import { APIs } from "../helpers/url";
import { getAuthTokenFromLocalStorage, getFormBody } from "../helpers/utils";

export function fetchPosts() {
  return (dispatch) => {
    const url = APIs.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIs.createPost();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        if (data.success) {
          dispatch(addPost(data.data.post));

          return;
        }
      });
  };
}

export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIs.createComment();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const url = APIs.toggleLike(id, likeType);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addLikeToStore(id, userId));
        }
      });
  };
}

export function addLikeToStore(postId, userId) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
  };
}
