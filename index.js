"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.codePointAt = function (str, pos) {
    if (pos === void 0) { pos = 0; }
    if (str === null || str === undefined) {
        throw TypeError();
    }
    str = String(str);
    var size = str.length;
    var i = pos ? Number(pos) : 0;
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
exports.codePoints = function (str, opts) {
    opts = getCpOptions({ unique: false }, opts);
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
        if (opts.unique && result.indexOf(point) !== -1) {
            continue;
        }
        result.push(point);
    }
    return result;
};
var getCpOptions = function (defaultOptions, options) {
    if (options === null || options === undefined ||
        typeof options === 'function') {
        return defaultOptions;
    }
    if (typeof options === 'boolean') {
        defaultOptions = __assign({}, defaultOptions);
        defaultOptions.unique = options;
        options = defaultOptions;
    }
    if (options.unique === undefined) {
        options.unique = false;
    }
    return options;
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
exports.fromCodePoint = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var codeUnits = [];
    var codeLen = 0;
    var result = '';
    for (var index = 0, len = args.length; index !== len; ++index) {
        var codePoint = +args[index];
        if (!(codePoint < 0x10FFFF && (codePoint >>> 0) === codePoint)) {
            throw new RangeError("Invalid code point: " + codePoint);
        }
        if (codePoint <= 0xFFFF) { 
            codeLen = codeUnits.push(codePoint);
        }
        else { 
            codePoint -= 0x10000;
            codeLen = codeUnits.push((codePoint >> 10) + 0xD800, 
            (codePoint % 0x400) + 0xDC00 
            );
        }
        if (codeLen >= 0x3fff) {
            result += String.fromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result + String.fromCharCode.apply(null, codeUnits);
};

(function () {
  if (!String.prototype.codePointAt) {
    var defineProperty = (function () {
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) { }
      return result;
    }());
    var cpa = function (position) {
      if (this == null) {
        throw TypeError();
      }
      var str = String(this);
      return exports.codePointAt(str, position);
    };
    if (defineProperty) {
      defineProperty(String.prototype, 'codePointAt', {
        'value': cpa,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.codePointAt = cpa;
    }
  }
}());
(function () {
  if (!String.fromCodePoint) {
    var defineProperty = (function () {
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) { }
      return result;
    }());
    if (defineProperty) {
      defineProperty(String, 'fromCodePoint', {
        'value': exports.fromCodePoint,
        'configurable': true,
        'writable': true
      });
    } else {
      String.fromCodePoint = exports.fromCodePoint;
    }
  }
}());