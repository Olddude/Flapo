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
      [fromPost.postFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select loading', () => {
    const result = isLoading({
      [fromPost.postFeatureKey]: {
        loading: true
      }
    });
    expect(result).toEqual(true);
  });

  it('should select response', () => {
    const result = response({
      [fromPost.postFeatureKey]: {
        response: {}
      }
    });
    expect(result).toEqual({} as any);
  });

  it('should select error', () => {
    const result = error({
      [fromPost.postFeatureKey]: {
        error: {}
      }
    });
    expect(result).toEqual({} as any);
  });

  it('should select view', () => {
    const result = view({
      [fromPost.postFeatureKey]: {
        view: 'list'
      }
    });
    expect(result).toEqual('list');
  });

  it('should select sort options', () => {
    const result = sortOptions({
      [fromPost.postFeatureKey]: {
        sortOptions: ''
      }
    });
    expect(result).toEqual('');
  });

  it('should select filter options', () => {
    const result = filterOptions({
      [fromPost.postFeatureKey]: {
        filterOptions: ''
      }
    });
    expect(result).toEqual('');
  });
});
