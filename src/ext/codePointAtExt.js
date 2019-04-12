// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
(function () {
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