import { expect } from 'chai';
import { codePoints } from "../src/index";
describe("Test codePoints", () => {
  it('should return code points of the string 10', (done) => {
    expect(codePoints('10')).deep.equal([49, 48]);
    done();
  });
  it('should return code points of the string Hello World!', (done) => {
    expect(codePoints('Hello World!')).deep.equal([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]);
    done();
  });
  it('should return code points of the string Hello World! that are unique', (done) => {
    expect(codePoints('Hello World!', true)).deep.equal([72, 101, 108, 111, 32, 87, 114, 100, 33]);
    done();
  });
  it('should return code points of the string 0𧌠嶲0𧏨', (done) => {
    expect(codePoints('0𧌠嶲0𧏨')).deep.equal([48, 160544, 195060, 48, 160744]);
    done();
  });
  it('should return code points of the string without duplication, using `unique` option.', (done) => {
    expect(codePoints('0𧌠嶲0嶲', { unique: true })).deep.equal([48, 160544, 195060]);
    done();
  });
  it('should return an empty array when it takes an empty string.', (done) => {
    expect(codePoints('', true)).deep.equal([]);
    done();
  });
  it('should return a long array when it «-(¯`v´¯)-«【🇺​🇹​🇫​►🇨​🇴​🇩​🇪​-🇵​🇴​🇮​🇳​🇹​🇸​】»-(¯`v´¯)-»', (done) => {
    expect(codePoints('«-(¯`v´¯)-«【🇺​🇹​🇫​►🇨​🇴​🇩​🇪​-🇵​🇴​🇮​🇳​🇹​🇸​】»-(¯`v´¯)-»')).deep.equal(
      [
        171,
        45,
        40,
        175,
        96,
        118,
        180,
        175,
        41,
        45,
        171,
        12304,
        127482,
        8203,
        127481,
        8203,
        127467,
        8203,
        9658,
        127464,
        8203,
        127476,
        8203,
        127465,
        8203,
        127466,
        8203,
        45,
        127477,
        8203,
        127476,
        8203,
        127470,
        8203,
        127475,
        8203,
        127481,
        8203,
        127480,
        8203,
        12305,
        187,
        45,
        40,
        175,
        96,
        118,
        180,
        175,
        41,
        45,
        187,
      ]);
    done();
  });
});