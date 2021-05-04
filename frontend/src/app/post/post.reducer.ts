import { createReducer, on } from '@ngrx/store';
import { Post } from '.';
import * as PostActions from './post.actions';

export const postFeatureKey = 'post';

export interface State {
  readonly loading?: boolean;
  readonly error?: any;
  readonly response?: Post[];
  readonly sortOptions?: string;
  readonly filterOptions?: string;
  readonly view?: string;
}

export const initialState: State = {
  view: 'list'
};

export const reducer = createReducer(
  initialState,

  on(PostActions.loadPosts, state => ({
    ...state,
    loading: true
  })),
  on(PostActions.loadPostsSuccess, (state, action) => ({
    ...state,
    loading: false,
    response: [ ...action.posts ]
  })),
  on(PostActions.loadPostsFailure, (state, action) => ({
    ...state,
    loading: false,
    response: undefined,
    error: { ...action.error }
  })),
  on(PostActions.toggleView, state => ({
    ...state,
    view: state?.view === 'list' ? 'grid' : 'list'
  })),
  on(PostActions.toggleSortOptions, state => {
    const newState = { ...state };
    if (!state?.sortOptions) {
      newState.sortOptions = 'pricePerUnit:asc';
    } else {
      if (state.sortOptions === 'pricePerUnit:asc') {
        newState.sortOptions = 'pricePerUnit:desc';
      }
      if (state.sortOptions === 'pricePerUnit:desc') {
        newState.sortOptions = 'pricePerUnit:asc';
      }
    }
    return newState;
  }),
  on(PostActions.toggleFilterOptions, state => {
    const newState = { ...state };
    if (!state?.filterOptions) {
      newState.filterOptions = 'pricePerUnit:$lt2.00';
    } else {
      if (state.filterOptions) {
        newState.filterOptions = undefined;
      } else {
        newState.filterOptions = 'pricePerUnit:$lt2.00';
      }
    }
    return newState;
  })
);
