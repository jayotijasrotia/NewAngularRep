import { PostiveNumPipe } from './postive-num.pipe';

describe('PostiveNumPipe', () => {
  it('create an instance', () => {
    const pipe = new PostiveNumPipe();
    expect(pipe).toBeTruthy();
  });
});
