import {describe, expect, it} from "vitest";
import {expect as myExpect} from "./expect.js";

describe('toBe', () => {
    it('passes for identical primitives', () => {
        expect(() => myExpect(1).toBe(1)).not.toThrow();
    });

    it('throws for different primitives', () => {
        expect(() => myExpect(1).toBe(2)).toThrow();
    });

    it('throws for structurally equal but referentially different objects', () => {
        expect(() => myExpect({ a: 1 }).toBe({ a: 1 })).toThrow();
    });

    it('passes for the same object reference', () => {
        const obj = { a: 1 };

        expect(() => myExpect(obj).toBe(obj)).not.toThrow();
    });
});

describe('toEqual', () => {
    it('passes for identical primitives', () => {
        expect(() => myExpect(1).toEqual(1)).not.toThrow();
        expect(() => myExpect('a').toEqual('a')).not.toThrow();
        expect(() => myExpect(true).toEqual(true)).not.toThrow();
    });

    it('throws for different numbers', () => {
        expect(() => myExpect(1).toEqual(2)).toThrow();
    });

    it('throws for different strings', () => {
        expect(() => myExpect('a').toEqual('b')).toThrow();
    });

    it('throws for different booleans', () => {
        expect(() => myExpect(true).toEqual(false)).toThrow();
    });

    it('passes for NaN compared to NaN', () => {
        expect(() => myExpect(NaN).toEqual(NaN)).not.toThrow();
    });

    it('passes for structurally equal flat objects', () => {
        expect(() => myExpect({ a: 1, b: 'x' }).toEqual({ a: 1, b: 'x' })).not.toThrow();
    });

    it('throws when a value differs on an otherwise matching object', () => {
        expect(() => myExpect({ a: 1, b: 2 }).toEqual({ a: 1, b: 3 })).toThrow();
    });

    it('throws when key sets differ', () => {
        expect(() => myExpect({ a: 1 }).toEqual({ a: 1, b: 2 } as any)).toThrow();
    });

    it('passes for deeply nested equal objects', () => {
        const a = { x: { y: { z: [1, 2, { w: 3 }] } } };
        const b = { x: { y: { z: [1, 2, { w: 3 }] } } };

        expect(() => myExpect(a).toEqual(b)).not.toThrow();
    });

    it('throws for deeply nested objects that differ', () => {
        const a = { x: { y: { z: [1, 2, { w: 3 }] } } };
        const b = { x: { y: { z: [1, 2, { w: 4 }] } } };

        expect(() => myExpect(a).toEqual(b)).toThrow();
    });

    it('passes for equal arrays', () => {
        expect(() => myExpect([1, 2, 3]).toEqual([1, 2, 3])).not.toThrow();
    });

    it('throws for arrays in different order', () => {
        expect(() => myExpect([1, 2, 3]).toEqual([3, 2, 1])).toThrow();
    });

    it('throws for arrays of different length', () => {
        expect(() => myExpect([1, 2]).toEqual([1, 2, 3])).toThrow();
    });

    it('throws when comparing an array to an array-like object', () => {
        expect(() => myExpect([1, 2] as any).toEqual({ 0: 1, 1: 2, length: 2 } as any)).toThrow();
    });
});

describe('toBeTruthy', () => {
    it('passes for a truthy value', () => {
        expect(() => myExpect(1).toBeTruthy()).not.toThrow();
        expect(() => myExpect('non-empty').toBeTruthy()).not.toThrow();
        expect(() => myExpect({}).toBeTruthy()).not.toThrow();
    });

    it('throws for falsy values', () => {
        expect(() => myExpect(0).toBeTruthy()).toThrow();
        expect(() => myExpect('').toBeTruthy()).toThrow();
        expect(() => myExpect(null).toBeTruthy()).toThrow();
        expect(() => myExpect(undefined).toBeTruthy()).toThrow();
    });
});

describe('toThrow', () => {
    it('passes when the function throws', () => {
        expect(() => myExpect(() => { throw new Error('boom'); }).toThrow()).not.toThrow();
    });

    it('throws when the function does not throw', () => {
        expect(() => myExpect(() => 42).toThrow()).toThrow();
    });
});
