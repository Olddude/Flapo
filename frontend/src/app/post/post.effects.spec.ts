import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { PostEffects } from './post.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  loadPosts,
  loadPostsFailure,
  loadPostsSuccess,
  toggleFilterOptions,
  toggleSortOptions
} from './post.actions';
import { filterOptions, sortOptions } from './post.selectors';
import { HttpClient } from '@angular/common/http';

describe('PostEffects', () => {
  let actions$: Observable<any>;
  let effects: PostEffects;
  let store: MockStore;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PostEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            { selector: sortOptions, value: undefined },
            { selector: filterOptions, value: undefined },
          ]
        }),
        {
          provide: HttpClient,
          useFactory: () => ({
            get: () => of([])
          })
        }
      ]
    });

    effects = TestBed.inject(PostEffects);
    store = TestBed.inject(MockStore);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load posts after toggle sort', async () => {
    actions$ = of(toggleSortOptions());
    const outputAction = await effects.toggleSort$.toPromise();
    expect(outputAction).toEqual(loadPosts());
  });

  it('should load posts after toggle sort', async () => {
    actions$ = of(toggleFilterOptions());
    const outputAction = await effects.toggleFilter$.toPromise();
    expect(outputAction).toEqual(loadPosts());
  });

  it('should dispatch load success on successful load', async () => {
    spyOn(http, 'get').and.returnValue(of([]));
    actions$ = of(loadPosts());
    const outputAction = await effects.loadPosts$.toPromise();
    expect(outputAction).toEqual(loadPostsSuccess({ posts: [] }));
  });

  it('should dispatch load failure on failed load', async () => {
    spyOn(http, 'get').and.returnValue(throwError(null));
    actions$ = of(loadPosts());
    const outputAction = await effects.loadPosts$.toPromise();
    expect(outputAction).toEqual(loadPostsFailure({ error: null }));
  });
});
