// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
if (!String.prototype.codePointAt) {
  var defineProperty = (function () {
    // IE 8 only supports `Object.defineProperty` on DOM elements
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