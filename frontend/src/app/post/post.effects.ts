import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as PostActions from './post.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '.';
import { Store } from '@ngrx/store';
import * as uriTemplate from 'uri-templates';
import { filterOptions, sortOptions } from './post.selectors';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.loadPosts),
      withLatestFrom(
        this.store.select(sortOptions),
        this.store.select(filterOptions)
      ),
      map(([_, sortBy, filterBy]) => {
        return uriTemplate(`${environment.api}/posts{?sortBy,filterBy}`)
          .fillFromObject({ sortBy, filterBy });
      }),
      switchMap(url => {
        return this.http.get(url).pipe(
          map((posts: Post[]) => PostActions.loadPostsSuccess({ posts })),
          catchError(error => of(PostActions.loadPostsFailure({ error })))
        );
      })
    );
  });

  toggleSort$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.toggleSortOptions),
      switchMap(() => of(PostActions.loadPosts()))
    );
  });

  toggleFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.toggleFilterOptions),
      switchMap(() => of(PostActions.loadPosts()))
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    private readonly store: Store<any>
  ) { }

}
