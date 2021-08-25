import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import { routerReducer, RouterState } from '@ngrx/router-store';

export interface RootState {
  readonly router?: RouterState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
