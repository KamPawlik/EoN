import { NoCommaPipe } from './no-comma.pipe';

describe('NoCommaPipe', () => {
  let pipe: NoCommaPipe;

  beforeEach(() => {
    pipe = new NoCommaPipe();
  })

  it('empty parameter should return empty string', () => {
    expect(pipe.transform(null)).toBe("")
  });

  it('should return value with comma instead of dot', () => {
    expect(pipe.transform(519.99)).toBe("519,99")
  });
});
