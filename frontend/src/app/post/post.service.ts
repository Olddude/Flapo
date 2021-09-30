import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadPosts,
  toggleView,
  toggleFilterOption,
  toggleSortOption
} from './post.actions';
import {
  isLoading,
  response,
  error,
  view,
  filterOption,
  sortOption
} from './post.selectors';

@Injectable({ providedIn: 'root' })
export class PostService {

  isLoading$ = this.store.select(isLoading);
  response$ = this.store.select(response);
  error$ = this.store.select(error);
  view$ = this.store.select(view);
  filterOption$ = this.store.select(filterOption);
  sortOption$ = this.store.select(sortOption);

  constructor(
    private readonly store: Store<any>
  ) { }

  load(): void {
    this.store.dispatch(loadPosts());
  }

  sort(): void {
    this.store.dispatch(toggleSortOption());
  }

  view(): void {
    this.store.dispatch(toggleView());
  }

  filter(): void {
    this.store.dispatch(toggleFilterOption());
  }

}
