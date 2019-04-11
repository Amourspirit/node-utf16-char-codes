export declare const codePointAt: (str: string, position?: number) => number | undefined;
export interface ICodePointOptions {
    unique: boolean;
}
export declare const codePoints: (str: string, option?: ICodePointOptions | undefined) => number[];
