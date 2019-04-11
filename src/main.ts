export const codePointAt = (str: string, position: number = 0): number | undefined => {
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

  if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {
    const second = str.charCodeAt(i + 1);

    if (second >= 0xDC00 && second <= 0xDFFF) {
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