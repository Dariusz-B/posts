import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { PostsService } from './../../services/posts.service';
import * as PostsActions from './../actions/posts.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.postsRequest.type),
      mergeMap(() =>
        this.postsService.getPosts().pipe(
          map((posts) => ({
            type: PostsActions.postsSuccess.type,
            posts: posts,
          }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
