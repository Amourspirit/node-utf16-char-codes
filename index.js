"use strict";
exports.__esModule = true;
exports.codePointAt = function (str, position) {
    if (position === void 0) { position = 0; }
    if (str === null || str === undefined) {
        throw TypeError();
    }
    str = String(str);
    var size = str.length;
    var i = position ? Number(position) : 0;
    if (Number.isNaN(i)) {
        i = 0;
    }
    if (i < 0 || i >= size) {
        return undefined;
    }
    var first = str.charCodeAt(i);
    if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {
        var second = str.charCodeAt(i + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            return ((first - 0xD800) * 0x400) + second - 0xDC00 + 0x10000;
        }
    }
    return first;
};
exports.codePoints = function (str, option) {
    option = option || { unique: false };
    if (typeof str !== 'string') {
        throw new TypeError("Argument str must be type of string.");
    }
    var result = [];
    var index = 0;
    var strC;
    while (index < str.length) {
        strC = str.charAt(index) + str.charAt(index + 1);
        var point = Number(exports.codePointAt(strC));
        if (Number.isNaN(point)) {
            throw new Error("An error occured getting code points. Unable to get code point at positions: " + index + " and " + (index + 1));
        }
        if (point > 0xffff) {
            index += 2;
        }
        else {
            index += 1;
        }
        if (option.unique && result.indexOf(point) !== -1) {
            continue;
        }
        result.push(point);
    }
    return result;
};
exports.codePointFullWidth = function (codePoint) {
    if (Number.isNaN(codePoint)) {
        return false;
    }
    if (codePoint >= 0x1100 && (codePoint <= 0x115F || 
        codePoint === 0x2329 || 
        codePoint === 0x232A || 
        (0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F) ||
        (0x3250 <= codePoint && codePoint <= 0x4DBF) ||
        (0x4E00 <= codePoint && codePoint <= 0xA4C6) ||
        (0xA960 <= codePoint && codePoint <= 0xA97C) ||
        (0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
        (0xF900 <= codePoint && codePoint <= 0xFAFF) ||
        (0xFE10 <= codePoint && codePoint <= 0xFE19) ||
        (0xFE30 <= codePoint && codePoint <= 0xFE6B) ||
        (0xFF01 <= codePoint && codePoint <= 0xFF60) ||
        (0xFFE0 <= codePoint && codePoint <= 0xFFE6) ||
        (0x1B000 <= codePoint && codePoint <= 0x1B001) ||
        (0x1F200 <= codePoint && codePoint <= 0x1F251) ||
        (0x20000 <= codePoint && codePoint <= 0x3FFFD))) {
        return true;
    }
    return false;
};

if (!String.prototype.codePointAt) {
  var defineProperty = (function () {
    try {
      var object = {};
      var $defineProperty = Object.defineProperty;
      var result = $defineProperty(object, object, object) && $defineProperty;
    } catch (error) { }
    return result;
  }());
  if (defineProperty) {
    defineProperty(String.prototype, 'codePointAt', {
      'value': exports.codePointAt,
      'configurable': true,
      'writable': true
    });
  } else {
    String.prototype.codePointAt = exports.codePointAt;
  }
}