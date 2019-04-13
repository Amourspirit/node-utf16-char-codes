import { expect } from 'chai';
import { fromCodePoint } from "../src/main";
describe("Test fromCodePoint", () => {
  it('should input 42 and equal *', (done) => {
    expect(fromCodePoint(42)).equal('*');
    done();
  });
  it('should input 65, 90 and equal AZ', (done) => {
    expect(fromCodePoint(65, 90)).equal('AZ');
    done();
  });
  it('should input 0x404 and equal \\u0404', (done) => {
    expect(fromCodePoint(0x404)).equal('\u0404');
    done();
  });
  it('should input 0x2F804 and equal \\uD87E\\uDC04', (done) => {
    expect(fromCodePoint(0x2F804)).equal('\uD87E\uDC04');
    done();
  });
  it('should input 0x1D306, 0x61, 0x1D307 and equal \\uD834\\uDF06a\\uD834\\uDF07', (done) => {
    expect(fromCodePoint(0x1D306, 0x61, 0x1D307)).equal('\uD834\uDF06a\uD834\uDF07');
    done();
  });
  it('should input Infinity and expect RangeError', (done) => {
    // https://stackoverflow.com/questions/40529776/chai-expect-function-to-throw-error
    expect(function () { fromCodePoint(Infinity)}).to.throw(RangeError);
    done();
  });
  it('should input -1 and expect RangeError', (done) => {
    expect(function () { fromCodePoint(-1) }).to.throw(RangeError);
    done();
  });
  it('should input 3.04 and expect RangeError', (done) => {
    expect(function () { fromCodePoint(3.14) }).to.throw(RangeError);
    done();
  });
  it('should input 3e-2 and expect RangeError', (done) => {
    expect(function () { fromCodePoint(3e-2) }).to.throw(RangeError);
    done();
  });
  it('should input NaN and expect RangeError', (done) => {
    expect(function () { fromCodePoint(NaN) }).to.throw(RangeError);
    done();
  });
});