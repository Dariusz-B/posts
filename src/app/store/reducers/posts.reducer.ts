import  {Action, createReducer, on}  from  '@ngrx/store'
import * as PostsActions from '../actions/posts.actions'
import {PostsState} from '../../models/posts.model'

export const PostsInitial : PostsState = {
    posts: null,
    loaded: false,
    loading: false
}

const postReducer = createReducer(
    PostsInitial,
    on(PostsActions.postsRequest, state => ({ ...state })),
    on(PostsActions.postsFail,    state => ({ ...state, loading: false })),
    on(PostsActions.postsSuccess, (state, {posts}) => ({ ...state, loading: false, posts: posts, loaded: true})),
);
  
export function reducer(state: PostsState | undefined, action: Action) {
    return postReducer(state, action);
}