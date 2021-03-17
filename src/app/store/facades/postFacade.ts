import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentPostState, PostsState } from 'src/app/models/posts.model';
import * as CurrentPostActions from 'src/app/store/actions/currentPost.actions';
import * as PostsActions from 'src/app/store/actions/posts.actions';
import { Comment } from 'src/app/models/posts.model';

@Injectable({ providedIn: 'root' })
export class PostFacade {
    constructor(private store: Store<{posts: PostsState, currentPost: CurrentPostState}>) {}
    posts$: Observable<any>;

    getCurrentPost(id){
        let posts, currentPost;

        this.store.select(state=>state.posts.posts).subscribe(item=>posts = item);
        if(posts){
            currentPost = posts.find(item=>item.id == id);
        }

        if(!currentPost){
            this.store.dispatch(CurrentPostActions.postRequest({id: id}));
        }else{
            this.store.dispatch(CurrentPostActions.transferPost({post: currentPost}));
        }

        this.store.dispatch(CurrentPostActions.commentsRequest({id: id}));

        return this.store.select(state=>state.currentPost);
    }

    resetCurrentPost(){
        this.store.dispatch(CurrentPostActions.resetState());
    }

    getPosts(){
        this.store.select(state => state.posts.loaded).pipe(take(1))
        .subscribe(loaded => {
          if (!loaded) this.store.dispatch(PostsActions.postsRequest()); 
        });

        return this.store.select(state => state.posts);
    }

    sendComment(comment: Comment){
        this.store.dispatch(CurrentPostActions.addComment({comment: comment}));
    }
}



//    this.test$  = this.store.select(state => state.products.products).pipe(map(items=>{
//      let found = items.find(item=>item.id == this.id);
//      console.log(found);
//      return found != null ? found : {};
//      }),
//        tap(foundItem=>{
//          console.log(foundItem);
//          if(!foundItem.hasOwnProperty('id')) this.store.dispatch(ProductActions.productRequest({id:this.id}));
//    }));
