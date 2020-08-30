(() => {
    if (!String.fromCodePoint) {
        const fpa = (...args) => {
            const codeUnits = [];
            let codeLen = 0;
            let result = "";
            for (const cp of args) {
                let codePoint = cp;
                if (!(codePoint < 0x10FFFF && (codePoint >>> 0) === codePoint))
                    throw RangeError("Invalid code point: " + codePoint);
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
        try { 
            Object.defineProperty(String, "fromCodePoint", {
                "value": fpa, "configurable": true, "writable": true
            });
        }
        catch (e) {
            String.fromCodePoint = fpa;
        }
    }
})();
(() => {
    if (!String.prototype.codePointAt) {
        const defineProperty = (() => {
            let result = null;
            try {
                const object = {};
                const $defineProperty = Object.defineProperty;
                result = $defineProperty(object, object.toString(), object) && $defineProperty;
            }
            finally {
            }
            return result;
        })();
        const cpa = function (position) {
            if (this == null) {
                throw TypeError();
            }
            const string = String(this);
            const size = string.length;
            let index = position ? Number(position) : 0;
            if (index !== index) { 
                index = 0;
            }
            if (index < 0 || index >= size) {
                return undefined;
            }
            const first = string.charCodeAt(index);
            let second;
            if ( 
            first >= 0xD800 && first <= 0xDBFF && 
                size > index + 1 
            ) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) { 
                    return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
            }
            return first;
        };
        if (defineProperty) {
            defineProperty(String.prototype, 'codePointAt', {
                'value': cpa,
                'configurable': true,
                'writable': true
            });
        }
        else {
            String.prototype.codePointAt = cpa;
        }
    }
})();
export const codePointAt = (str, pos = 0) => {
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
    if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {
        const second = str.charCodeAt(i + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            return ((first - 0xD800) * 0x400) + second - 0xDC00 + 0x10000;
        }
    }
    return first;
};
export const codePoints = (str, opts) => {
    opts = getCpOptions({ unique: false }, opts);
    if (typeof str !== 'string') {
        throw new TypeError(`Argument str must be type of string.`);
    }
    const result = [];
    let index = 0;
    let strC;
    while (index < str.length) {
        strC = str.charAt(index) + str.charAt(index + 1);
        const point = Number(codePointAt(strC));
        if (Number.isNaN(point)) {
            throw new Error(`An error occured getting code points. Unable to get code point at positions: ${index} and ${index + 1}`);
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
const getCpOptions = (defaultOptions, options) => {
    if (options === null || options === undefined ||
        typeof options === 'function') {
        return defaultOptions;
    }
    if (typeof options === 'boolean') {
        defaultOptions = Object.assign({}, defaultOptions);
        defaultOptions.unique = options;
        options = defaultOptions;
    }
    if (options.unique === undefined) {
        options.unique = false;
    }
    return options;
};
export const codePointFullWidth = (codePoint) => {
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
export const fromCodePoint = function (...args) {
    const codeUnits = [];
    let codeLen = 0;
    let result = '';
    for (let index = 0, len = args.length; index !== len; ++index) {
        let codePoint = +args[index];
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
