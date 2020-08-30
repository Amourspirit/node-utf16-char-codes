const expect = require('chai').expect;
var fs = require('fs');

describe('String.fromCodePoint: Remove String fromCodePoint', function () {
  it('should remove String fromCodePoint if it exist', function (done) {
    if (String.fromCodePoint) {
      String.fromCodePoint = null;
    };
    expect(String.fromCodePoint).equal(null);
    done();
  });
});

describe('String.fromCodePoint: Import of index.js should reassign String fromCodePoint to project version', function () {
  it('should have a String fromCodePoint again', function (done) {
    expect(String.fromCodePoint).equal(null);
    eval(fs.readFileSync(process.cwd() + '/scratch/lib/main.js').toString());
    expect(typeof String.fromCodePoint).equal('function');
    done();
  });
});

describe("String.fromCodePoint: Test fromCodePoint", () => {
  it('should input 42 and equal *', (done) => {
    expect(String.fromCodePoint(42)).equal('*');
    done();
  });
  it('should input 65, 90 and equal AZ', (done) => {
    expect(String.fromCodePoint(65, 90)).equal('AZ');
    done();
  });
  it('should input 0x404 and equal \\u0404', (done) => {
    expect(String.fromCodePoint(0x404)).equal('\u0404');
    done();
  });
  it('should input 0x2F804 and equal \\uD87E\\uDC04', (done) => {
    expect(String.fromCodePoint(0x2F804)).equal('\uD87E\uDC04');
    done();
  });
  it('should input 0x1D306, 0x61, 0x1D307 and equal \\uD834\\uDF06a\\uD834\\uDF07', (done) => {
    expect(String.fromCodePoint(0x1D306, 0x61, 0x1D307)).equal('\uD834\uDF06a\uD834\uDF07');
    done();
  });
  it('should input Infinity and expect RangeError', (done) => {
    // https://stackoverflow.com/questions/40529776/chai-expect-function-to-throw-error
    expect(function () { String.fromCodePoint(Infinity) }).to.throw(RangeError);
    done();
  });
  it('should input -1 and expect RangeError', (done) => {
    expect(function () { String.fromCodePoint(-1) }).to.throw(RangeError);
    done();
  });
  it('should input 3.04 and expect RangeError', (done) => {
    expect(function () { String.fromCodePoint(3.14) }).to.throw(RangeError);
    done();
  });
  it('should input 3e-2 and expect RangeError', (done) => {
    expect(function () { String.fromCodePoint(3e-2) }).to.throw(RangeError);
    done();
  });
  it('should input NaN and expect RangeError', (done) => {
    expect(function () { String.fromCodePoint(NaN) }).to.throw(RangeError);
    done();
  });
});