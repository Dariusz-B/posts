import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';

export const postsRequest = createAction(
    '[Backend API] Get posts request'
  );

export const postsSuccess = createAction(
    '[Backend API] Get posts success',
    props<{ posts: Post[]}>()
  );

export const postsFail = createAction(
    '[Backend API] Get posts fail'
  );
