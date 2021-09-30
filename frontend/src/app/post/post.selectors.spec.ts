import { FilterOption, SortOption, ViewType } from '.';
import * as fromPost from './post.reducer';
import {
  selectPostState,
  error,
  filterOption,
  isLoading,
  response,
  sortOption,
  view
} from './post.selectors';

describe('Post Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPostState({
      [fromPost.postFeatureKey]: fromPost.initialState
    });

    expect(result).toEqual(fromPost.initialState,);
  });

  it('should select loading', () => {
    const result = isLoading({
      [fromPost.postFeatureKey]: {
        ...fromPost.initialState,
        loading: true
      }
    });
    expect(result).toEqual(true);
  });

  it('should select response', () => {
    const result = response({
      [fromPost.postFeatureKey]: {
        ...fromPost.initialState,
        response: {}
      }
    });
    expect(result).toEqual({} as any);
  });

  it('should select error', () => {
    const result = error({
      [fromPost.postFeatureKey]: {
        ...fromPost.initialState,
        error: {}
      }
    });
    expect(result).toEqual({} as any);
  });

  it('should select view', () => {
    const result = view({
      [fromPost.postFeatureKey]: {
        ...fromPost.initialState,
        view: ViewType.list
      }
    });
    expect(result).toEqual(ViewType.list);
  });

  it('should select sort option', () => {
    const result = sortOption({
      [fromPost.postFeatureKey]: {
        ...fromPost.initialState,
        sortOption: SortOption.pricePerUnitAscending
      }
    });
    expect(result).toEqual(SortOption.pricePerUnitAscending);
  });

  it('should select filter options', () => {
    const result = filterOption({
      [fromPost.postFeatureKey]: {
        ...fromPost.initialState,
        filterOption: FilterOption.pricePerUnitLessThanTwo
      }
    });
    expect(result).toEqual(FilterOption.pricePerUnitLessThanTwo);
  });
});
