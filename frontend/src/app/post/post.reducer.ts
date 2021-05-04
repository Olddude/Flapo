import { createReducer, on } from '@ngrx/store';
import { FilterOptions, Post, SortOptions, ViewType } from '.';
import * as PostActions from './post.actions';

export const postFeatureKey = 'post';

export interface State {
  readonly view: ViewType;
  readonly loading?: boolean;
  readonly error?: any;
  readonly response?: Post[];
  readonly sortOptions?: SortOptions;
  readonly filterOptions?: FilterOptions;
}

export const initialState: State = {
  view: ViewType.list
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
    view: state.view === ViewType.list
      ? ViewType.grid
      : ViewType.list
  })),
  on(PostActions.toggleSortOptions, state => ({
    ...state,
    sortOptions: !state.sortOptions
      ? SortOptions.pricePerUnitAscending
      : state.sortOptions === SortOptions.pricePerUnitAscending
        ? SortOptions.pricePerUnitDescending
        : SortOptions.pricePerUnitAscending
  })),
  on(PostActions.toggleFilterOptions, state => ({
    ...state,
    filterOptions: !state.filterOptions
      ? FilterOptions.pricePerUnitLessThanTwo
      : undefined
  }))
);
