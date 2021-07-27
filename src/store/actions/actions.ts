import {
  TODOS_FETCH_REQUESTED,
  SET_INPUT_VALUE,
  SET_POSTS,
} from "../../store/sagas/todos.saga";
import { GroupedPosts } from "../../models/models.interface";

export const fetchTodosAction = () => ({
  type: TODOS_FETCH_REQUESTED,
  payload: null,
});

export const SetInputValue = (value: {
  key: string;
  input: string;
  index: number;
  value: string;
}) => ({
  type: SET_INPUT_VALUE,
  payload: value,
});

export const SetPosts = (posts: GroupedPosts) => ({
  type: SET_POSTS,
  payload: posts,
});
