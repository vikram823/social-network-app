import { UPDATE_POSTS } from "./actionTypes";
import { APIs } from "../helpers/url";

export function fetchPosts() {
  return (dispatch) => {
    const url = APIs.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.data.posts))
      });
  };
}

export function updatePosts(posts) {
    return({
        type: UPDATE_POSTS,
        posts
    })
}
