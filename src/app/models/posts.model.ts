export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  loading: boolean;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CurrentPostState {
  post: Post;
  comments: Comment[];
  loaded: boolean;
  loading: boolean;
}
