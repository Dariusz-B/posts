import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';
import * as PostsActions from '../actions/posts.actions'
import { Store } from '@ngrx/store';
import { PostsState } from 'src/app/models/posts.model';

 
@Injectable()
export class PostsEffects {

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.postsRequest.type),
    mergeMap(() => this.postsService.getPosts()
      .pipe(
        map(posts => ({type: PostsActions.postsSuccess.type, posts: posts})),
        catchError(() => {return EMPTY})
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private postsService: PostsService
  ) {}
}