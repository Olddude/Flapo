import * as fromPost from './post.reducer';
import {
  selectPostState,
  error,
  filterOptions,
  isLoading,
  response,
  sortOptions,
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
        view: 'list'
      }
    });
    expect(result).toEqual('list');
  });

  it('should select sort options', () => {
    const result = sortOptions({
      [fromPost.postFeatureKey]: {
        ...fromPost.initialState,
        sortOptions: ''
      }
    });
    expect(result).toEqual('');
  });

  it('should select filter options', () => {
    const result = filterOptions({
      [fromPost.postFeatureKey]: {
        ...fromPost.initialState,
        filterOptions: ''
      }
    });
    expect(result).toEqual('');
  });
});
