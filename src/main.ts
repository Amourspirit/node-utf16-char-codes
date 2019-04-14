// #region codePointAt
/**
 * Method returns a non-negative integer that is the Unicode code point value.  
 * This method was introduced to ECMAScript 2015 (6th Edition, ECMA-262) and is included
 * here for older versions of ECMAScripts.
 * 
 * This module also will add the String.prototype.codePointAt method if it does not exist
 * @param str String to get the position from
 * @param pos (optional) Position of an element in the String to return the code point value from.  
 * Default 0
 * @returns Returns a nonnegative integer Number less than 1114112 (0x110000) that is the
 * code point value of the UTF-16 encoded code point starting at the string element at
 * position pos in the String resulting from converting this object to a String.
 * If there is no element at that position, the result is undefined.
 * If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.
 * 
 * As typescript, although in typescript you can just use String.fromCodePoint()
 * @example
```ts
import { codePointAt } from 'utf16-char-codes';
codePointAt('ABC', 1);           // 66
codePointAt('\uD800\uDC00', 0);  // 65536
codePointAt('XYZ', 42);          // undefined
```
 * As JavaScript
 * @example
```js
('ABC').codePointAt(1);           // 66
('\uD800\uDC00').codePointAt(0);  // 65536
('XYZ').codePointAt(42);          // undefined
```
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
 */
export const codePointAt = (str: string, pos: number = 0): number | undefined => {
  if (str === null || str === undefined) {
    throw TypeError();
  }

  str = String(str);

  const size = str.length;
  let i = pos ? Number(pos) : 0;

  if (Number.isNaN(i)) {
    i = 0;
  }

  if (i < 0 || i >= size) {
    return undefined;
  }

  const first = str.charCodeAt(i);
  // check if it’s the start of a surrogate pair
  if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {
    const second = str.charCodeAt(i + 1);

    if (second >= 0xDC00 && second <= 0xDFFF) {
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      return ((first - 0xD800) * 0x400) + second - 0xDC00 + 0x10000;
    }
  }
  return first;
}
// #endregion
// #region codePoints
/**
 * Options for codePoints
 * @param unique If true only code points that are unique will be returned in the array. Default false.
 */
export interface ICodePointOptions {
  /** 
   * If true only code points that are unique will be returned in the array.  
   * Default false
  */
  unique: boolean;
}
/**
 * Gets the code points for a string
 * @param str The input string to get the code points for.
 * @param opts (optional) Options, if boolean is passed in it will determine if the
 * method returns unique code points. If true only code points that are unique will be returned in the array.
 * @returns a number array of integers matching the code points of str.
 * @example
 ```ts
import { codePoints } from 'utf16-char-codes';

let p = codePoints('Hello World!');   // [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]
p = codePoints('Hello World!', true); // [72, 101, 108, 111, 32, 87, 114, 100, 33]
p = codePoints('0𧌠嶲0𧏨');             // [48, 160544, 195060, 48, 160744]
 ```
 */
export const codePoints = (str: string, opts?: ICodePointOptions | boolean): number[] => {
  opts = getCpOptions({ unique: false }, opts);

  if (typeof str !== 'string') {
    throw new TypeError(`Argument str must be type of string.`);
  }
  const result: number[] = [];

  let index: number = 0;
  let strC: string;
  while (index < str.length) {
    strC = str.charAt(index) + str.charAt(index + 1);
    const point = Number(codePointAt(strC));
    if (Number.isNaN(point)) {
      throw new Error(`An error occured getting code points. Unable to get code point at positions: ${index} and ${index + 1}`);
    }
    if (point > 0xffff) {
      index += 2;
    } else {
      index += 1;
    }
    if (opts.unique && result.indexOf(point) !== -1) {
      continue;
    }
    result.push(point);
  }
  return result;
}
const getCpOptions = (defaultOptions: ICodePointOptions, options?: ICodePointOptions | boolean): ICodePointOptions => {
  if (options === null || options === undefined ||
    typeof options === 'function') {
    return defaultOptions;
  }

  if (typeof options === 'boolean') {
    defaultOptions = { ...defaultOptions };
    defaultOptions.unique = options;
    options = defaultOptions;
  }
  if (options.unique === undefined) {
    options.unique = false;
  }
  return options;
}
// #endregion
// #region codePointFullWidth
/**
 * Test if a unicode code point is a full width character.
 * @param codePoint The code point to test
 * @returns true if codePoint is a full width character; otherwise, false
 * @example
```ts
import { codePointFullWidth } from 'utf16-char-codes';

const fullWidth = 'ＦＵＬＬＷＩＤＴＨ ＴＥＸＴ';
let p = Number(fullWidth.codePointAt(3));
console.log(codePointFullWidth(p)); // true
console.log(codePointFullWidth(Number(('고').codePointAt(0)))); // true
console.log(codePointFullWidth(Number(('A').codePointAt(0)))); // false
console.log(codePointFullWidth(Infinity)); // false
```
 * see: https://unicode-table.com/en/blocks/halfwidth-and-fullwidth-forms/
 */
export const codePointFullWidth = (codePoint: number): boolean => {
  if (Number.isNaN(codePoint)) {
    return false;
  }
  if (
    codePoint >= 0x1100 && (
      codePoint <= 0x115F || // Hangul Jamo
      codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
      codePoint === 0x232A || // RIGHT-POINTING ANGLE BRACKET
      // CJK Radicals Supplement .. Enclosed CJK Letters and Months
      (0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F) ||
      // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
      (0x3250 <= codePoint && codePoint <= 0x4DBF) ||
      // CJK Unified Ideographs .. Yi Radicals
      (0x4E00 <= codePoint && codePoint <= 0xA4C6) ||
      // Hangul Jamo Extended-A
      (0xA960 <= codePoint && codePoint <= 0xA97C) ||
      // Hangul Syllables
      (0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
      // CJK Compatibility Ideographs
      (0xF900 <= codePoint && codePoint <= 0xFAFF) ||
      // Vertical Forms
      (0xFE10 <= codePoint && codePoint <= 0xFE19) ||
      // CJK Compatibility Forms .. Small Form Variants
      (0xFE30 <= codePoint && codePoint <= 0xFE6B) ||
      // Halfwidth and Fullwidth Forms
      (0xFF01 <= codePoint && codePoint <= 0xFF60) ||
      (0xFFE0 <= codePoint && codePoint <= 0xFFE6) ||
      // Kana Supplement
      (0x1B000 <= codePoint && codePoint <= 0x1B001) ||
      // Enclosed Ideographic Supplement
      (0x1F200 <= codePoint && codePoint <= 0x1F251) ||
      // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
      (0x20000 <= codePoint && codePoint <= 0x3FFFD)
    )
  ) {
    return true;
  }

  return false;
}
// #endregion fromCodePoint
// #region fromCodePoint
/**
 * Method returns a string created by using the specified sequence of code points.  
 * This method was introduced to ECMAScript 2015 (6th Edition, ECMA-262) and is included
 * here for older versions of ECMAScripts.
 * 
 * This module also will add the String.fromCodePoint method if it does not exist
 * 
 * @param args A sequence of code points.
 * @returns A string created by using the specified sequence of code points.
 * @throws {RangeError} A RangeError is thrown if an invalid Unicode code point is given (e.g. "RangeError: NaN is not a valid code point").
 * 
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
 * 
 * As typescript, although in typescript you can just use String.fromCodePoint()
 * @example
```ts
import { fromCodePoint } from 'utf16-char-codes';

fromCodePoint(42);       // "*"
fromCodePoint(65, 90);   // "AZ"
fromCodePoint(0x404);    // "\u0404"
fromCodePoint(0x2F804);  // "\uD87E\uDC04"
fromCodePoint(194564);   // "\uD87E\uDC04"
fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

fromCodePoint(Infinity); // RangeError
fromCodePoint(-1);       // RangeError
fromCodePoint(3.14);     // RangeError
fromCodePoint(3e-2);     // RangeError
fromCodePoint(NaN);      // RangeError
```
 * As JavaScript
 * @example
 ```js
String.fromCodePoint(42);       // "*"
String.fromCodePoint(65, 90);   // "AZ"
String.fromCodePoint(0x404);    // "\u0404"
String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
String.fromCodePoint(194564);   // "\uD87E\uDC04"
String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

String.fromCodePoint(Infinity); // RangeError
String.fromCodePoint(-1);       // RangeError
String.fromCodePoint(3.14);     // RangeError
String.fromCodePoint(3e-2);     // RangeError
String.fromCodePoint(NaN);      // RangeError
```
 */
// tslint:disable-next-line: only-arrow-functions
export const fromCodePoint = function(...args: number[]): string {
  const codeUnits = [];
  let codeLen: number = 0
  let result: string = '';
// tslint:disable-next-line: one-variable-per-declaration
  for (let index = 0, len = args.length; index !== len; ++index) {
    let codePoint =+ args[index];
    // correctly handles all cases including `NaN`, `-Infinity`, `+Infinity`
    // The surrounding `!(...)` is required to correctly handle `NaN` cases
    // The (codePoint>>>0) === codePoint clause handles decimals and negatives
    if (!(codePoint < 0x10FFFF && (codePoint >>> 0) === codePoint)) {
      throw new RangeError("Invalid code point: " + codePoint);
    }
    if (codePoint <= 0xFFFF) { // BMP code point
      codeLen = codeUnits.push(codePoint);
    } else { // Astral code point; split in surrogate halves
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      codePoint -= 0x10000;
      codeLen = codeUnits.push(
        (codePoint >> 10) + 0xD800,  // highSurrogate
        (codePoint % 0x400) + 0xDC00 // lowSurrogate
      );
    }
    if (codeLen >= 0x3fff) {
      result += String.fromCharCode.apply(null, codeUnits);
      codeUnits.length = 0;
    }
  }
  return result + String.fromCharCode.apply(null, codeUnits);
}
// #endregion