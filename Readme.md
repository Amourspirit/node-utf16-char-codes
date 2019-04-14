<p align="center">
«-(¯`v´¯)-« <a href="https://www.npmjs.com/package/utf16-char-codes">【🇺​🇹​🇫​►🇨​🇭​🇦​🇷​ 🇨​🇴​🇩​🇪​🇸​​】</a> »-(¯`v´¯)-»
<br /><a href="https://en.wikipedia.org/wiki/UTF-16">utf-16-code-points</a> string encode and decode
</p>
<p align="center">
<a href="https://travis-ci.org/Amourspirit/node-utf16-char-codes"><img src="https://travis-ci.org/Amourspirit/node-utf16-char-codes.svg?branch=master" /></a>
<a href="https://snyk.io/test/github/Amourspirit/node-utf16-char-codes?targetFile=package.json"><img src="https://snyk.io/test/github/Amourspirit/node-utf16-char-codes/badge.svg?targetFile=package.json" /></a> <img src="https://img.shields.io/github/package-json/v/Amourspirit/node-utf16-char-codes.svg" />
<img src="https://img.shields.io/github/license/Amourspirit/node-utf16-char-codes.svg" /><a href="http://github.com/badges/stability-badges"> <img src="http://badges.github.io/stability-badges/dist/stable.svg" /></a>
</p>

# utf16-char-codes

## Code Point methods

### codePoints(str[, opts])

Gets the code points for a string.  
Returns a number array of integers matching the code points of *str*.

```ts
import { codePoints } from 'utf16-char-codes';

let p = codePoints('Hello World!');   // [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]
p = codePoints('Hello World!', true); // [72, 101, 108, 111, 32, 87, 114, 100, 33]
p = codePoints('0𧌠嶲0𧏨');             // [48, 160544, 195060, 48, 160744]
```

```
@param str The input string to get the code points for.

@param opts (optional) Options, if boolean is passed in it will
       determine if the method returns unique code points.
       If true only code points that are unique will be returned in the array.
```

### codePointFullWidth(codePoint)

Test if a unicode code point is a full width character.  
Returns **true** if codePoint is a full width character; otherwise, **false**

```ts
import { codePointFullWidth } from 'utf16-char-codes';

const fullWidth = 'ＦＵＬＬＷＩＤＴＨ ＴＥＸＴ';
let p = Number(fullWidth.codePointAt(3));
console.log(codePointFullWidth(p)); // true
console.log(codePointFullWidth(Number(('고').codePointAt(0)))); // true
console.log(codePointFullWidth(Number(('A').codePointAt(0)))); // false
console.log(codePointFullWidth(Infinity)); // false
```
```
@param codePoint The code point to test
```
### codePointAt([pos])

Method returns a non-negative integer that is the Unicode code point value.  
This method was introduced to ECMAScript 2015 (6th Edition, ECMA-262) and is included here for older versions of ECMAScripts.

```js
('ABC').codePointAt(1);           // 66
('\uD800\uDC00').codePointAt(0);  // 65536
('XYZ').codePointAt(42);          // undefined
```

```
@param pos (optional) Position of an element in the String to
       return the code point value from.
       Default value 0
```

Ref: [String​.prototype​.char​CodeAt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

### fromCodePoint()

Method returns a string created by using the specified sequence of code points.  
This method was introduced to ECMAScript 2015 (6th Edition, ECMA-262) and is included for older versions of ECMAScripts.

```js
String.fromCodePoint(42);       // "*"
String.fromCodePoint(65, 90);   // "AZ"
String.fromCodePoint(0x404);    // "\u0404"
String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
String.fromCodePoint(194564);   // "\uD87E\uDC04"
String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"
```

Ref: [String​.from​Code​Point()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)

### Extensions

This module also will add **String.prototype.codePointAt** and **String.fromCodePoint** methods if they do not exist. This usefull for using this module with versions of ECMAScript pre 2015 (es6).

Use *somestring.codePointAt()* on any version of ECMAScript

```js
('ABC').codePointAt(1);           // 66
('\uD800\uDC00').codePointAt(0);  // 65536
('XYZ').codePointAt(42);          // undefined
```

Use *String.fromCodePoint()* on any version of ECMAScript

```js
String.fromCodePoint(42);       // "*"
String.fromCodePoint(65, 90);   // "AZ"
String.fromCodePoint(0x404);    // "\u0404"
String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
String.fromCodePoint(194564);   // "\uD87E\uDC04"
String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"
```