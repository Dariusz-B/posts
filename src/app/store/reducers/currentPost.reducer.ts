import  {Action, createReducer, on}  from  '@ngrx/store'
import * as CurrentPostActions from 'src/app/store/actions/currentPost.actions';
import { Post, CurrentPostState } from '../../models/posts.model'

const PostInitial : Post = {
    userId: null,
    id: null,
    title: '',
    body: ''
}

export const CurrentPostInitial : CurrentPostState = {
    post: PostInitial,
    comments: [],
    loaded: false,
    loading: false
}

const currentPostReducer = createReducer(
    CurrentPostInitial,
    on(CurrentPostActions.postRequest, state => ({ ...state, loading: true})),
    on(CurrentPostActions.postSuccess, (state, {post}) => ({...state, post: post, loading: false, loaded: true })),
    on(CurrentPostActions.transferPost, (state, {post}) => ({...state, post: post})),
    on(CurrentPostActions.commentsSuccess, (state, {comments}) => ({...state, comments: comments})),
    on(CurrentPostActions.resetState, () => (CurrentPostInitial)),
    on(CurrentPostActions.addCommentSuccess, (state, {comment}) => ({...state, comments: state.comments.concat(comment)}))
);
  
export function reducer(state: CurrentPostState | undefined, action: Action) {
    return currentPostReducer(state, action);
}