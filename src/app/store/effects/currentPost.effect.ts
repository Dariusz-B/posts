import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { PostsService } from './../../services/posts.service';
import * as CurrentPostActions from './../actions/currentPost.actions';

@Injectable()
export class CurrentPostEffects {
  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentPostActions.postRequest),
      mergeMap((props) =>
        this.postsService.getSinglePost(props.id).pipe(
          map((post) => ({
            type: CurrentPostActions.postSuccess.type,
            post: post,
          }))
        )
      )
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentPostActions.commentsRequest),
      mergeMap((props) =>
        this.postsService.getComments(props.id).pipe(
          map((comments) => ({
            type: CurrentPostActions.commentsSuccess.type,
            comments: comments,
          }))
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentPostActions.addComment),
      mergeMap((props) =>
        this.postsService.addComment(props.comment).pipe(
          map(() => ({
            type: CurrentPostActions.addCommentSuccess.type,
            comment: props.comment,
          }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
