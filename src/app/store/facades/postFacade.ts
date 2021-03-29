import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CurrentPostState, PostsState } from './../../models/posts.model';
import * as CurrentPostActions from './../actions/currentPost.actions';
import * as PostsActions from './../actions/posts.actions';
import { Comment } from './../../models/posts.model';

@Injectable({ providedIn: 'root' })
export class PostFacade {
  constructor(
    private store: Store<{ posts: PostsState; currentPost: CurrentPostState }>
  ) {}
  posts$: Observable<any>;

  getCurrentPost(id) {
    let posts, currentPost;

    this.store
      .select((state) => state.posts.posts)
      .subscribe((item) => (posts = item));
    if (posts) {
      currentPost = posts.find((item) => item.id == id);
    }

    if (!currentPost) {
      this.store.dispatch(CurrentPostActions.postRequest({ id: id }));
    } else {
      this.store.dispatch(
        CurrentPostActions.transferPost({ post: currentPost })
      );
    }

    this.store.dispatch(CurrentPostActions.commentsRequest({ id: id }));

    return this.store.select((state) => state.currentPost);
  }

  resetCurrentPost() {
    this.store.dispatch(CurrentPostActions.resetState());
  }

  getPosts() {
    this.store
      .select((state) => state.posts.loaded)
      .pipe(take(1))
      .subscribe((loaded) => {
        if (!loaded) this.store.dispatch(PostsActions.postsRequest());
      });

    return this.store.select((state) => state.posts);
  }

  sendComment(comment: Comment) {
    this.store.dispatch(CurrentPostActions.addComment({ comment: comment }));
  }
}
