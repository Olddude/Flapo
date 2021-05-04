import * as fromPost from './post.actions';

describe('loadPosts', () => {
  it('should be successful', () => {
    expect(fromPost.loadPosts().type).toBe('[Post] Load Posts');
  });
});
