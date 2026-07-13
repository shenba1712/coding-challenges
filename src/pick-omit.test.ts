import {pick, omit} from "./pick-omit.js";

const flag: unique symbol = Symbol('flag');
const marker = Symbol('marker');

interface Obj {
    a: number;
    b: string;
    c: number[];
    d: { nested: string };
    e: symbol;
    [flag]: boolean;
}

function makeObj(): Obj {
    return {
        a: 1,
        b: 'hello',
        c: [1, 2, 3],
        d: { nested: 'value' },
        e: marker,
        [flag]: true,
    };
}

describe('pick', () => {
    it('selects only the given string keys', () => {
        const obj = makeObj();

        expect(pick(obj, ['a', 'b'])).toEqual({ a: 1, b: 'hello' });
    });

    it('selects a symbol key alongside string keys', () => {
        const obj = makeObj();

        expect(pick(obj, ['a', flag])).toEqual({ a: 1, [flag]: true });
    });

    it('preserves array and nested object values by reference (shallow copy)', () => {
        const obj = makeObj();

        const result = pick(obj, ['c', 'd']);

        expect(result.c).toBe(obj.c);
        expect(result.d).toBe(obj.d);
    });

    it('preserves a symbol-valued property', () => {
        const obj = makeObj();

        expect(pick(obj, ['e']).e).toBe(marker);
    });

    it('returns an empty object when given no keys', () => {
        expect(pick(makeObj(), [])).toEqual({});
    });

    it('returns all keys when all keys are requested', () => {
        const obj = makeObj();

        expect(pick(obj, ['a', 'b', 'c', 'd', 'e', flag])).toEqual(obj);
    });

    it('skips keys that are not own properties of the object', () => {
        interface Sparse { a: number; b?: number }
        const sparse: Sparse = { a: 1 };

        expect(pick(sparse, ['a', 'b'])).toEqual({ a: 1 });
    });

    it('does not mutate the original object', () => {
        const obj = makeObj();
        const original = { ...obj };

        pick(obj, ['a']);

        expect(obj).toEqual(original);
    });

    it('returns a new object, not a reference to the original', () => {
        const obj = makeObj();

        expect(pick(obj, ['a', 'b'])).not.toBe(obj);
    });
});

describe('omit', () => {
    it('removes the given string keys', () => {
        const obj = makeObj();
        const { b: _b, ...rest } = obj;

        expect(omit(obj, ['b'])).toEqual(rest);
    });

    it('removes a symbol key alongside string keys', () => {
        const obj = makeObj();

        const result = omit(obj, ['a', flag]);

        expect(result).toEqual({ b: 'hello', c: [1, 2, 3], d: { nested: 'value' }, e: marker });
        expect(Object.prototype.hasOwnProperty.call(result, flag)).toBe(false);
    });

    it('preserves array and nested object values by reference (shallow copy)', () => {
        const obj = makeObj();

        const result = omit(obj, ['a']);

        expect(result.c).toBe(obj.c);
        expect(result.d).toBe(obj.d);
    });

    it('preserves a symbol-valued property', () => {
        const obj = makeObj();

        expect(omit(obj, ['a']).e).toBe(marker);
    });

    it('returns a shallow copy when given no keys', () => {
        const obj = makeObj();

        expect(omit(obj, [])).toEqual(obj);
    });

    it('returns an empty object when all keys are omitted', () => {
        const obj = makeObj();

        expect(omit(obj, ['a', 'b', 'c', 'd', 'e', flag])).toEqual({});
    });

    it('does not mutate the original object', () => {
        const obj = makeObj();
        const original = { ...obj };

        omit(obj, ['a']);

        expect(obj).toEqual(original);
    });

    it('returns a new object, not a reference to the original', () => {
        const obj = makeObj();

        expect(omit(obj, ['a'])).not.toBe(obj);
    });
});
