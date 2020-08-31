import { expect } from 'chai';
import { codePointAt } from "../src/index";
describe('String that starts with a BMP symbol', () => {
  it('should check for 🐴  with no position in a string and equal 0x1F434', (done) => {
    expect(codePointAt('🐴')).equal(0x1F434);
    done();
  });
  it('should check for no position in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(codePointAt('abc\uD834\uDF06def')).equal(0x61);
    done();
  });
  it('should check for position 0 in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', 0)).equal(0x61);
    done();
  });
  it('should check for position -0 in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', -0)).equal(0x61);
    done();
  });
  it('should check for negative Infinity in "abc\uD834\uDF06def" and equal undefined', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', Infinity)).equal(undefined);
    done();
  });
  it('should check for positive Infinity in "abc\uD834\uDF06def" and equal undefined', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', -Infinity)).equal(undefined);
    done();
  });
  it('should check for position -1 in "abc\uD834\uDF06def" and equal undefined', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', -1)).equal(undefined);
    done();
  });
  it('should check for position 3 in "abc\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', 3)).equal(0x1D306);
    done();
  });
  it('should check for position 4 in "abc\uD834\uDF06def" and equal 0xDF06', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', 4)).equal(0xDF06);
    done();
  });
  it('should check for position 5 in "abc\uD834\uDF06def" and equal 0x64', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', 5)).equal(0x64);
    done();
  });
  it('should check for position 45 in "abc\uD834\uDF06def" that is shorter and equal undefined', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', 45)).equal(undefined);
    done();
  });
  it('should check for NAN in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', NaN)).equal(0x61);
    done();
  });
  it('should check for undefined in "abc\uD834\uDF06def" and equal 0x61', (done) => {
    expect(codePointAt('abc\uD834\uDF06def', undefined)).equal(0x61);
    done();
  });
});

describe('String that starts with an astral symbol', () => {
  it('should check for no position in "\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(codePointAt('\uD834\uDF06def')).equal(0x1D306);
    done();
  });
  it('should check for position 0 in "\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(codePointAt('\uD834\uDF06def', 0)).equal(0x1D306);
    done();
  });
  it('should check for position 1 in "\uD834\uDF06def" and equal 0xDF06', (done) => {
    expect(codePointAt('\uD834\uDF06def', 1)).equal(0xDF06);
    done();
  });
  it('should check for position -1 in "\uD834\uDF06def" and equal undefined', (done) => {
    expect(codePointAt('\uD834\uDF06def', -1)).equal(undefined);
    done();
  });
  it('should check for position 45 in "\uD834\uDF06def" that is shorter and equal undefined', (done) => {
    expect(codePointAt('\uD834\uDF06def', 45)).equal(undefined);
    done();
  });
  it('should check for NAN in "\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(codePointAt('\uD834\uDF06def', NaN)).equal(0x1D306);
    done();
  });
  it('should check for undefined in "\uD834\uDF06def" and equal 0x1D306', (done) => {
    expect(codePointAt('\uD834\uDF06def', undefined)).equal(0x1D306);
    done();
  });
});
describe('Lone high surrogates', () => {
  it('should check for no position in a string and equal 0xD834', (done) => {
    expect(codePointAt('\uD834abc')).equal(0xD834);
    done();
  });
  it('should check for position -1 in a string and equal undefined', (done) => {
    expect(codePointAt('\uD834abc', -1)).equal(undefined);
    done();
  });
  it('should check for position -0 in a string and equal 0xD834', (done) => {
    expect(codePointAt('\uD834abc', -0)).equal(0xD834);
    done();
  });
  it('should check for position 0 in a string and equal 0xD834', (done) => {
    expect(codePointAt('\uD834abc', 0)).equal(0xD834);
    done();
  });
  it('should check for NaN in a string and equal 0xD834', (done) => {
    expect(codePointAt('\uD834abc', NaN)).equal(0xD834);
    done();
  });
  it('should check for undefined in a string and equal 0xD834', (done) => {
    expect(codePointAt('\uD834abc', undefined)).equal(0xD834);
    done();
  });
});
describe('Lone low surrogates', () => {
  it('should check for no position in a string and equal 0xD834', (done) => {
    expect(codePointAt('\uDF06abc')).equal(0xDF06);
    done();
  });
  it('should check for position -1 in a string and equal undefined', (done) => {
    expect(codePointAt('\uDF06abc', -1)).equal(undefined);
    done();
  });
  it('should check for position -0 in a string and equal 0xDF06', (done) => {
    expect(codePointAt('\uDF06abc', -0)).equal(0xDF06);
    done();
  });
  it('should check for position 0 in a string and equal 0xDF06', (done) => {
    expect(codePointAt('\uDF06abc', 0)).equal(0xDF06);
    done();
  });
  it('should check for position 40 in a string that is shorter and equal undefined', (done) => {
    expect(codePointAt('\uDF06abc', 40)).equal(undefined);
    done();
  });
  it('should check for position NaN in a string and equal 0xDF06', (done) => {
    expect(codePointAt('\uDF06abc', NaN)).equal(0xDF06);
    done();
  });
  it('should check for position undefined in a string and equal 0xDF06', (done) => {
    expect(codePointAt('\uDF06abc', undefined)).equal(0xDF06);
    done();
  });
});