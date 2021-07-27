export interface Action {
  type: string;
  payload: any;
}

export interface Post {
  id: number;
  location: string;
  time: string;
  author: string;
  text: string;
  [key: string]: string | number;
}

export interface GroupedPosts {
  [key: string]: Post[];
}

export interface PostsState {
  list: GroupedPosts;
}

export interface State {
  posts: PostsState;
}

export enum Groupable {
  Author = 'author',
  Location = 'location',
  Time = 'time',
  Week = 'Week'
}