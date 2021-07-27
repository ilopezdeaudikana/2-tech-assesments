import { Action, Post, PostsState } from "../../models/models.interface";
import {
  TODOS_FETCH_SUCCEEDED,
  SET_INPUT_VALUE,
  SET_POSTS,
} from "../sagas/todos.saga";

export const todosReducer = (
  state: PostsState = { list: {} },
  action: Action
): PostsState => {
  switch (action.type) {
    case TODOS_FETCH_SUCCEEDED:
      return {
        ...state,
        list: action.payload,
      };
    case SET_POSTS:
      return {
        ...state,
        list: action.payload,
      };
    case SET_INPUT_VALUE:
      const { list } = state;
      const { key, index, input, value } = action.payload;
      const post: Post = { ...list[key][index] };
      post[input] = value;
      const newPostsArray: Post[] = [...list[key]];
      newPostsArray[index] = post;
      return {
        ...state,
        list: { ...list, [key]: [...newPostsArray] },
      };
    default:
      return state;
  }
};
