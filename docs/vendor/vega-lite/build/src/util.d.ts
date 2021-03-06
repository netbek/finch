import { LogicalOperand } from './logical';
/**
 * Creates an object composed of the picked object properties.
 *
 * Example:  (from lodash)
 *
 * var object = {'a': 1, 'b': '2', 'c': 3};
 * pick(object, ['a', 'c']);
 * // → {'a': 1, 'c': 3}
 *
 */
export declare function pick(obj: object, props: string[]): {};
/**
 * The opposite of _.pick; this method creates an object composed of the own
 * and inherited enumerable string keyed properties of object that are not omitted.
 */
export declare function omit(obj: object, props: string[]): object;
/**
 * Converts any object into a string representation that can be consumed by humans.
 */
export declare const stringify: any;
/**
 * Converts any object into a string of limited size, or a number.
 */
export declare function hash(a: any): any;
export declare function contains<T>(array: T[], item: T): boolean;
/** Returns the array without the elements in item */
export declare function without<T>(array: T[], excludedItems: T[]): T[];
export declare function union<T>(array: T[], other: T[]): T[];
/**
 * Returns true if any item returns true.
 */
export declare function some<T>(arr: T[], f: (d: T, k?: any, i?: any) => boolean): boolean;
/**
 * Returns true if all items return true.
 */
export declare function every<T>(arr: T[], f: (d: T, k?: any, i?: any) => boolean): boolean;
export declare function flatten(arrays: any[]): any;
/**
 * recursively merges src into dest
 */
export declare function mergeDeep<T>(dest: T, ...src: Partial<T>[]): T;
export declare function unique<T>(values: T[], f: (item: T) => string | number): T[];
export interface Dict<T> {
    [key: string]: T;
}
export declare type StringSet = Dict<true>;
/**
 * Returns true if the two dictionaries disagree. Applies only to defined values.
 */
export declare function differ<T>(dict: Dict<T>, other: Dict<T>): boolean;
export declare function hasIntersection(a: StringSet, b: StringSet): boolean;
export declare function isNumeric(num: string | number): boolean;
export declare function differArray<T>(array: T[], other: T[]): boolean;
export declare const keys: <T>(o: T) => (keyof T)[];
export declare function vals<T>(x: {
    [key: string]: T;
}): T[];
export declare type Flag<S extends string> = {
    [K in S]: 1;
};
export declare function flagKeys<S extends string>(f: Flag<S>): S[];
export declare function duplicate<T>(obj: T): T;
export declare function isBoolean(b: any): b is boolean;
/**
 * Convert a string into a valid variable name
 */
export declare function varName(s: string): string;
export declare function logicalExpr<T>(op: LogicalOperand<T>, cb: Function): string;
export declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
export declare type Omit<T, K extends keyof T> = {
    [P in Diff<keyof T, K>]: T[P];
};
/**
 * Delete nested property of an object, and delete the ancestors of the property if they become empty.
 */
export declare function deleteNestedProperty(obj: any, orderedProps: string[]): boolean;
export declare function titlecase(s: string): string;
/**
 * Converts a path to an access path.
 */
export declare function accessPath(path: string): string;
