import { expect } from 'chai';
import { codePointFullWidth, codePointAt } from "../src/index";
// #region Functions
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// #end region
const fullWidth = 'ＦＵＬＬＷＩＤＴＨ ＴＥＸＴ';
describe("Test codePointFullWidth", () => {
  it('should return true for char あ', (done) => {
    expect(codePointFullWidth(Number(codePointAt('あ')))).equal(true);
    done();
  });
  it('should return true for char 谢', (done) => {
    expect(codePointFullWidth(Number(codePointAt('谢')))).equal(true);
    done();
  });
  it('should return true for random char from ＦＵＬＬＷＩＤＴＨ ＴＥＸＴ', (done) => {
    let ran = getRandomInt(0, (fullWidth.length -1));
    let p = Number(fullWidth.codePointAt(ran));
    expect(codePointFullWidth(p)).equal(true);
    done();
  });
  it('should return true for char 고', (done) => {
    expect(codePointFullWidth(Number(codePointAt('고')))).equal(true);
    done();
  });
  it('should return fales for char A', (done) => {
    expect(codePointFullWidth(Number(codePointAt('A')))).equal(false);
    done();
  });
  it('should return fales for char *', (done) => {
    expect(codePointFullWidth(Number(codePointAt('*')))).equal(false);
    done();
  });
  it('should return fales for char ﾜ', (done) => {
    expect(codePointFullWidth(Number(codePointAt('ﾜ')))).equal(false);
    done();
  });
  it('should return false for 0', (done) => {
    expect(codePointFullWidth(0)).equal(false);
    done();
  });
  it('should return false for 4352 (0x1100)', (done) => {
    
    expect(codePointFullWidth(4352)).equal(true);
    done();
  });
  it(`should return false for random number from 0 and 4351.`, (done) => {
    let ran = getRandomInt(0, 4351);
    expect(codePointFullWidth(ran)).equal(false);
    done();
  });
  
  it(`should return false for random number from -1000000 and -1.`, (done) => {
    let ran = getRandomInt(-1000000, -1);
    expect(codePointFullWidth(ran)).equal(false);
    done();
  });
  it(`should return false for random half width charcters from 0xFF61 to 0xFFCD`, (done) => {
    let ran = getRandomInt(0xFF61, 0xFFDC);
    expect(codePointFullWidth(ran)).equal(false);
    done();
  });
  it(`should return false for random half width charcters from 0xFFE8 to 0xFFEE`, (done) => {
    let ran = getRandomInt(0xFFE8, 0xFFEE);
    // console.log(`Randome Number: ${ran.toString(16)}`);
    expect(codePointFullWidth(ran)).equal(false);
    done();
  });
  it(`should return true for random full width charcters from 0xFF01 to 0xFF60`, (done) => {
    let ran = getRandomInt(0xFF01, 0xFF60);
    // console.log(`Randome Number: ${ran.toString(16)}`);
    expect(codePointFullWidth(ran)).equal(true);
    done();
  });
  it('should return false for NaN', (done) => {
    expect(codePointFullWidth(NaN)).equal(false);
    done();
  });
  it('should return false for Infinity', (done) => {
    expect(codePointFullWidth(Infinity)).equal(false);
    done();
  });
  it('should return false for -Infinity', (done) => {
    expect(codePointFullWidth(-Infinity)).equal(false);
    done();
  });
});

