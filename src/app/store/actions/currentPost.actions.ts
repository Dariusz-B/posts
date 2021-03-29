import { createAction, props } from '@ngrx/store';

import { Post, Comment } from './../../models/posts.model';

export const postRequest = createAction(
  '[Backend API] Get single post request',
  props<{ id: number }>()
);

export const postSuccess = createAction(
  '[Backend API] Get single post success',
  props<{ post: Post }>()
);

export const commentsRequest = createAction(
  '[Backend API] Get comments request',
  props<{ id: number }>()
);

export const commentsSuccess = createAction(
  '[Backend API] Get comments success',
  props<{ comments: Comment[] }>()
);

export const transferPost = createAction(
  '[Store currentPost] Move post to currentPost',
  props<{ post: Post }>()
);

export const resetState = createAction(
  '[Store currentPost] Reset currentPost'
);

export const addComment = createAction(
  '[Backend API] Post new comment',
  props<{ comment: Comment }>()
);

export const addCommentSuccess = createAction(
  '[Backend API] Post new comment success',
  props<{ comment: Comment }>()
);
