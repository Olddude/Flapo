import { createAction, props } from '@ngrx/store';
import { Post } from '.';

export const loadPosts = createAction(
  '[Post] Load Posts'
);

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: any }>()
);

export const toggleSortOptions = createAction(
  '[Post] Toggle Sort Options');

export const toggleFilterOptions = createAction(
  '[Post] Toggle Filter Options'
);

export const toggleView = createAction(
  '[Post] Toggle View'
);
