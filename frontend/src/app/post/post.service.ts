import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadPosts,
  toggleView,
  toggleFilterOptions,
  toggleSortOptions
} from './post.actions';
import {
  isLoading,
  response,
  error,
  view
} from './post.selectors';

@Injectable({ providedIn: 'root' })
export class PostService {

  isLoading$ = this.store.select(isLoading);
  response$ = this.store.select(response);
  error$ = this.store.select(error);
  view$ = this.store.select(view);

  constructor(
    private readonly store: Store<any>
  ) { }

  load(): void {
    this.store.dispatch(loadPosts());
  }

  sort(): void {
    this.store.dispatch(toggleSortOptions());
  }

  view(): void {
    this.store.dispatch(toggleView());
  }

  filter(): void {
    this.store.dispatch(toggleFilterOptions());
  }

}
