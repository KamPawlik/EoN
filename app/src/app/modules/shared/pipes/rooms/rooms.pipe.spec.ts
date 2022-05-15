import { RoomsPipe } from './rooms.pipe';

describe('RoomsPipe', () => {
  let pipe: RoomsPipe;

  beforeEach(() => {
    pipe = new RoomsPipe();
  })

  it('should return "pokój" if value is 1', () => {
    expect(pipe.transform(1)).toBe("1 pokój");
  })

  it('should return "pokoi" if value is greater or equal 5', () => {
    expect(pipe.transform(5)).toBe("5 pokoi");
  })

  it('should return "pokoje" if value is less than 5 and greater than 1', () => {
    expect(pipe.transform(4)).toBe("4 pokoje");
  })
});
