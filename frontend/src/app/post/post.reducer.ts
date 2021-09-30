import { createReducer, on } from '@ngrx/store';
import { FilterOption, Post, SortOption, ViewType } from '.';
import * as PostActions from './post.actions';

export const postFeatureKey = 'post';

export interface State {
  readonly view: ViewType;
  readonly sortOption?: SortOption;
  readonly filterOption?: FilterOption;
  readonly loading?: boolean;
  readonly error?: any;
  readonly response?: Post[];
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
  on(PostActions.toggleSortOption, state => ({
    ...state,
    sortOption: !state.sortOption
      ? SortOption.pricePerUnitAscending
      : state.sortOption === SortOption.pricePerUnitAscending
        ? SortOption.pricePerUnitDescending
        : SortOption.pricePerUnitAscending,

  })),
  on(PostActions.toggleFilterOption, state => ({
    ...state,
    filterOption: !state.filterOption
      ? FilterOption.pricePerUnitLessThanTwo
      : undefined
  }))
);
