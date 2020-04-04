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
export declare const codePointAt: (str: string, pos?: number) => number | undefined;
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
export declare const codePoints: (str: string, opts?: boolean | ICodePointOptions | undefined) => number[];
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
export declare const codePointFullWidth: (codePoint: number) => boolean;
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
export declare const fromCodePoint: (...args: number[]) => string;
