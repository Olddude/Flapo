import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadPosts, toggleFilterOptions, toggleSortOptions, toggleView } from './post.actions';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({})
      ]
    });
    service = TestBed.inject(PostService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load posts on load', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    service.load();
    expect(storeDispatchSpy).toHaveBeenCalledWith(loadPosts());
  });

  it('should toggle sort options on sort', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    service.sort();
    expect(storeDispatchSpy).toHaveBeenCalledWith(toggleSortOptions());
  });

  it('should toggle sort options on filter', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    service.filter();
    expect(storeDispatchSpy).toHaveBeenCalledWith(toggleFilterOptions());
  });

  it('should toggle view', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    service.view();
    expect(storeDispatchSpy).toHaveBeenCalledWith(toggleView());
  });
});
