import * as fromPost from './post.actions';

describe('loadPosts', () => {
  it('should be of type', () => {
    expect(fromPost.loadPosts().type).toBe('[Post] Load Posts');
  });
});

describe('loadPostsSuccess', () => {
  it('should be of type', () => {
    expect(
      fromPost.loadPostsSuccess({ posts: [] }).type
    ).toBe('[Post] Load Posts Success');
  });
});

describe('loadPostsFailure', () => {
  it('should be of type', () => {
    expect(
      fromPost.loadPostsFailure({ error: null }).type
    ).toBe('[Post] Load Posts Failure');
  });
});

describe('toggleSortOptions', () => {
  it('should be of type', () => {
    expect(
      fromPost.toggleSortOptions().type
    ).toBe('[Post] Toggle Sort Options');
  });
});

describe('toggleFilterOptions', () => {
  it('should be of type', () => {
    expect(
      fromPost.toggleFilterOptions().type
    ).toBe('[Post] Toggle Filter Options');
  });
});

describe('toggleView', () => {
  it('should be of type', () => {
    expect(
      fromPost.toggleView().type
    ).toBe('[Post] Toggle View');
  });
});
