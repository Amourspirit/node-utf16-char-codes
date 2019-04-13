// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
(function () {
  if (!String.fromCodePoint) {
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