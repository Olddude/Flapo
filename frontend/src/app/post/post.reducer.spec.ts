import { FilterOptions, SortOptions, ViewType } from '.';
import {
  loadPosts,
  loadPostsFailure,
  loadPostsSuccess,
  toggleFilterOptions,
  toggleSortOptions,
  toggleView
} from './post.actions';
import { reducer, initialState, State } from './post.reducer';

describe('Post Reducer', () => {

  describe('view initial state', () => {
    it('should be list', () => {
      expect(initialState).toEqual(jasmine.objectContaining<State>({
        view: ViewType.list
      }));
    });
  });

  describe('an unknown action', () => {
    it('should be successful', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('load posts', () => {
    it('should set loading to true', () => {
      const result = reducer(initialState, loadPosts());
      expect(result).toEqual(jasmine.objectContaining<State>({
        loading: true
      }));
    });
  });

  describe('load posts success', () => {
    it('should set loading to false and assign response', () => {
      const result = reducer(initialState, loadPostsSuccess({ posts: [] }));
      expect(result).toEqual(jasmine.objectContaining<State>({
        loading: false,
        response: []
      }));
    });
  });

  describe('load posts failure', () => {
    it('should set loading to false and assign error', () => {
      const result = reducer(initialState, loadPostsFailure({ error: { } }));
      expect(result).toEqual(jasmine.objectContaining<State>({
        loading: false,
        response: undefined,
        error: {}
      }));
    });
  });

  describe('toggle view', () => {
    it('should set grid view if current view is list view', () => {
      const result = reducer({ ...initialState, view: ViewType.grid }, toggleView());
      expect(result).toEqual(jasmine.objectContaining<State>({
        view: ViewType.list
      }));
    });

    it('should set list view if current view is grid view', () => {
      const result = reducer({ ...initialState, view: ViewType.list }, toggleView());
      expect(result).toEqual(jasmine.objectContaining<State>({
        view: ViewType.grid
      }));
    });
  });

  describe('toggle sort options', () => {
    it('should set sort options [undefined -> pricePerUnit:asc]', () => {
      const result = reducer(initialState, toggleSortOptions());
      expect(result).toEqual(jasmine.objectContaining<State>({
        sortOptions: SortOptions.pricePerUnitAscending
      }));
    });

    it('should set sort options [pricePerUnit:asc -> pricePerUnit:desc]', () => {
      const result = reducer({
        ...initialState,
        sortOptions: SortOptions.pricePerUnitAscending
      }, toggleSortOptions());
      expect(result).toEqual(jasmine.objectContaining<State>({
        sortOptions: SortOptions.pricePerUnitDescending
      }));
    });

    it('should set sort options [pricePerUnit:desc -> pricePerUnit:asc]', () => {
      const result = reducer({
        ...initialState,
        sortOptions: SortOptions.pricePerUnitDescending
      }, toggleSortOptions());
      expect(result).toEqual(jasmine.objectContaining<State>({
        sortOptions: SortOptions.pricePerUnitAscending
      }));
    });
  });

  describe('toggle filter options', () => {
    it('should set filter options [undefined -> pricePerUnit:$lt2.00]', () => {
      const result = reducer(initialState, toggleFilterOptions());
      expect(result).toEqual(jasmine.objectContaining<State>({
        filterOptions: FilterOptions.pricePerUnitLessThanTwo
      }));
    });

    it('should set filter options [pricePerUnit:$lt2.00 -> undefined]', () => {
      const result = reducer({
        ...initialState,
        filterOptions: FilterOptions.pricePerUnitLessThanTwo
      }, toggleFilterOptions());
      expect(result).toEqual(jasmine.objectContaining<State>({
        filterOptions: undefined
      }));
    });
  });

});
