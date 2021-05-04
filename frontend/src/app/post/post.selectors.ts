import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPost from './post.reducer';

export const selectPostState = createFeatureSelector<fromPost.State>(
  fromPost.postFeatureKey
);

export const isLoading = createSelector(
  selectPostState,
  state => state.loading
);

export const response = createSelector(
  selectPostState,
  state => state.response
);

export const error = createSelector(
  selectPostState,
  state => state.error
);

export const view = createSelector(
  selectPostState,
  state => state.view
);

export const sortOptions = createSelector(
  selectPostState,
  state => state.sortOptions
);

export const filterOptions = createSelector(
  selectPostState,
  state => state.filterOptions
);
