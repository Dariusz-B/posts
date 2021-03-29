import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { CurrentPostState, Post, PostsState } from './../../models/posts.model';
import * as CurrentPostActions from './../actions/currentPost.actions';
import * as PostsActions from './../actions/posts.actions';
import { Comment } from './../../models/posts.model';

@Injectable({ providedIn: 'root' })
export class PostFacade {
  constructor(
    private store: Store<{ posts: PostsState; currentPost: CurrentPostState }>
  ) {};

  getCurrentPost(id: number): Observable<CurrentPostState> {
    return this.store.pipe(
      select((state) =>
        state.posts.posts ? state.posts.posts.filter((post) => post.id == id) : null
      ),
      take(1),
      tap((post) => {
        if (!post) {
          this.store.dispatch(CurrentPostActions.postRequest({ id: id }));
        } else {
          this.store.dispatch(
            CurrentPostActions.transferPost({ post: post[0] })
          );
        }
      }),
      switchMap(() => {
        this.store.dispatch(CurrentPostActions.commentsRequest({ id: id }));
        return this.store.select((state) => state.currentPost);
      })
    );
  }

  resetCurrentPost() {
    this.store.dispatch(CurrentPostActions.resetState());
  }

  getPosts(): Observable<Post[]> {
    return this.store.pipe(
      select((state) => state.posts.posts),
      tap((posts) => {
        if (!posts) {
          this.store.dispatch(PostsActions.postsRequest());
        }
      })
    );
  }

  sendComment(comment: Comment) {
    this.store.dispatch(CurrentPostActions.addComment({ comment: comment }));
  }
}
