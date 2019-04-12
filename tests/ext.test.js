const expect = require('chai').expect;
var fs = require('fs');

describe('String.prototype.codePointAt: Remove string prototype codePointAt', function() {
  it('should remove string prototype codePointAt if it exist', function(done) {
    if (String.prototype.codePointAt) {
      String.prototype.codePointAt = null;
    };
    expect(String.prototype.codePointAt).equal(null);
    done();
  });
});

describe('String.prototype.codePointAt: Import of index.js should reassign string prototype codePointAt to index.js version', function() {
  it('should have a string prototype codePointAt again', function(done) {
    // console.log('type of before eval', typeof String.prototype.codePointAt);
    eval(fs.readFileSync(process.cwd() + '/index.js').toString());
    // console.log('typeof after eval' , typeof String.prototype.codePointAt);
    done();
  });
});

describe('String.prototype.codePointAt: String that starts with a BMP symbol', () => {
  it('should check for 🐴  with no position in a string and equal 0x1F434', (done) => {
    expect(('🐴').codePointAt(0)).equal(0x1F434);
    done();
  });
  it('should check for no position in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(0)).equal(0x61);
    done();
  });
  it('should check for position 0 in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(0)).equal(0x61);
    done();
  });
  it('should check for position -0 in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(-0)).equal(0x61);
    done();
  });
  it('should check for negative Infinity in "abc\uD834\uDF06def" and equal undefined', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(Infinity)).equal(undefined);
    done();
  });
  it('should check for positive Infinity in "abc\uD834\uDF06def" and equal undefined', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(-Infinity)).equal(undefined);
    done();
  });
  it('should check for position -1 in "abc\uD834\uDF06def" and equal undefined', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(-1)).equal(undefined);
    done();
  });
  it('should check for position 3 in "abc\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(3)).equal(0x1D306);
    done();
  });
  it('should check for position 4 in "abc\uD834\uDF06def" and equal 0xDF06', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(4)).equal(0xDF06);
    done();
  });
  it('should check for position 5 in "abc\uD834\uDF06def" and equal 0x64', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(5)).equal(0x64);
    done();
  });
  it('should check for position 45 in "abc\uD834\uDF06def" that is shorter and equal undefined', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(45)).equal(undefined);
    done();
  });
  it('should check for NAN in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(NaN)).equal(0x61);
    done();
  });
  it('should check for undefined in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(('abc\uD834\uDF06def').codePointAt(undefined)).equal(0x61);
    done();
  });
});

describe('String.prototype.codePointAt: String that starts with an astral symbol', () => {
  it('should check for no position in "\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(('\uD834\uDF06def').codePointAt()).equal(0x1D306);
    done();
  });
  it('should check for position 0 in "\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(('\uD834\uDF06def').codePointAt(0)).equal(0x1D306);
    done();
  });
  it('should check for position 1 in "\uD834\uDF06def" and equal 0xDF06', (done) => {
    expect(('\uD834\uDF06def').codePointAt(1)).equal(0xDF06);
    done();
  });
  it('should check for position -1 in "\uD834\uDF06def" and equal undefined', (done) => {
    expect(('\uD834\uDF06def').codePointAt(-1)).equal(undefined);
    done();
  });
  it('should check for position 45 in "\uD834\uDF06def" that is shorter and equal undefined', (done) => {
    expect(('\uD834\uDF06def').codePointAt(45)).equal(undefined);
    done();
  });
  it('should check for NAN in "\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(('\uD834\uDF06def').codePointAt(NaN)).equal(0x1D306);
    done();
  });
  it('should check for undefined in "\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(('\uD834\uDF06def').codePointAt(undefined)).equal(0x1D306);
    done();
  });
});
describe('String.prototype.codePointAt: Lone high surrogates', () => {
  it('should check for no position in a string and equal 0xD834', (done) => {
    expect(('\uD834abc').codePointAt()).equal(0xD834);
    done();
  });
  it('should check for position -1 in a string and equal undefined', (done) => {
    expect(('\uD834abc').codePointAt(-1)).equal(undefined);
    done();
  });
  it('should check for position -0 in a string and equal 0xD834', (done) => {
    expect(('\uD834abc').codePointAt(-0)).equal(0xD834);
    done();
  });
  it('should check for position 0 in a string and equal 0xD834', (done) => {
    expect(('\uD834abc').codePointAt(0)).equal(0xD834);
    done();
  });
  it('should check for NaN in a string and equal 0xD834', (done) => {
    expect(('\uD834abc').codePointAt(NaN)).equal(0xD834);
    done();
  });
  it('should check for undefined in a string and equal 0xD834', (done) => {
    expect(('\uD834abc').codePointAt(undefined)).equal(0xD834);
    done();
  });
});
describe('String.prototype.codePointAt: Lone low surrogates', () => {
  it('should check for no position in a string and equal 0xD834', (done) => {
    expect(('\uDF06abc').codePointAt()).equal(0xDF06);
    done();
  });
  it('should check for position -1 in a string and equal undefined', (done) => {
    expect(('\uDF06abc').codePointAt(-1)).equal(undefined);
    done();
  });
  it('should check for position -0 in a string and equal 0xDF06', (done) => {
    expect(('\uDF06abc').codePointAt(-0)).equal(0xDF06);
    done();
  });
  it('should check for position 0 in a string and equal 0xDF06', (done) => {
    expect(('\uDF06abc').codePointAt(0)).equal(0xDF06);
    done();
  });
  it('should check for position 40 in a string that is shorter and equal undefined', (done) => {
    expect(('\uDF06abc').codePointAt(40)).equal(undefined);
    done();
  });
  it('should check for position NaN in a string and equal 0xDF06', (done) => {
    expect(('\uDF06abc').codePointAt(NaN)).equal(0xDF06);
    done();
  });
  it('should check for position undefined in a string and equal 0xDF06', (done) => {
    expect(('\uDF06abc').codePointAt(undefined)).equal(0xDF06);
    done();
  });
});