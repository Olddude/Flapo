import { reducer, initialState } from './post.reducer';

describe('Post Reducer', () => {
  describe('an unknown action', () => {
    it('should be successful', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
