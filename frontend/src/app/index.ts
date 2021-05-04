import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { postFeatureKey, reducer as postReducer, State as PostState } from './post/post.reducer';

export interface RootState {
  readonly router?: RouterState;
  readonly [postFeatureKey]?: PostState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  [postFeatureKey]: postReducer,
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
