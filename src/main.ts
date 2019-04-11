export const codePointAt = (str: string, position: number = 0): number | undefined => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
  if (str === null || str === undefined) {
    throw TypeError();
  }

  str = String(str);

  const size = str.length;
  let i = position ? Number(position) : 0;

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
export interface ICodePointOptions {
  unique: boolean;
}

export const codePoints = (str: string, option?: ICodePointOptions): number[] => {
  option = option || { unique: false };

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
    if (option.unique && result.indexOf(point) !== -1) {
      continue;
    }
    result.push(point);
  }
  return result;
}

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