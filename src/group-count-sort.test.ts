import {groupBy, countBy, sortBy} from "./group-count-sort.js";

describe('Group-count-sortBy-tests', () => {
    interface Fruit {
        name: string;
        color: string;
        price: number;
    }

    const fruits: Fruit[] = [
        { name: 'apple', color: 'red', price: 1.5 },
        { name: 'banana', color: 'yellow', price: 0.75 },
        { name: 'cherry', color: 'red', price: 3.0 },
        { name: 'grape', color: 'purple', price: 2.5 },
        { name: 'lemon', color: 'yellow', price: 1.0 },
    ];


    describe('groupBy', () => {
        it('groups fruits by color', () => {
            const expectedResult = {
                red: [
                    { name: 'apple', color: 'red', price: 1.5 },
                    { name: 'cherry', color: 'red', price: 3.0 },
                ],
                yellow: [
                    { name: 'banana', color: 'yellow', price: 0.75 },
                    { name: 'lemon', color: 'yellow', price: 1.0 },
                ],
                purple: [
                    { name: 'grape', color: 'purple', price: 2.5 },
                ],
            };

            const result = groupBy(fruits, f => f.color);

            expect(Object.keys(result)).toEqual(Object.keys(expectedResult));
            expect(result['red']).toHaveLength(2);
            expect(result['yellow']).toHaveLength(2);
            expect(result['purple']).toHaveLength(1);
            expect(result).toEqual(expectedResult);
        });

        it('groups fruits by price as cheap and expensive', () => {
            const expectedResult = {
                cheap: [
                    { name: 'apple', color: 'red', price: 1.5 },
                    { name: 'banana', color: 'yellow', price: 0.75 },
                    { name: 'lemon', color: 'yellow', price: 1.0 },

                ],
                expensive: [
                    { name: 'cherry', color: 'red', price: 3.0 },
                    { name: 'grape', color: 'purple', price: 2.5 },
                ],
            };

            const result = groupBy(fruits, f => f.price < 2 ? 'cheap': 'expensive');

            expect(Object.keys(result)).toEqual(Object.keys(expectedResult));
            expect(result['expensive']).toHaveLength(2);
            expect(result['cheap']).toHaveLength(3);
            expect(result).toEqual(expectedResult);
        });

        it('returns an empty object for an empty array', () => {
            expect(groupBy([], (f: Fruit) => f.color)).toEqual({});
        });

        it('groups a single-item array under one key', () => {
            const single = [fruits[0]!];

            expect(groupBy(single, f => f.color)).toEqual({ red: single });
        });
    });

    describe('countBy', () => {
        it('should count fruits by color', () => {
            const expectedResult = {
                red: 2,
                yellow: 2,
                purple: 1
            };

            const result = countBy(fruits, f => f.color);

            expect(Object.keys(result)).toEqual(Object.keys(expectedResult));
            expect(result['red']).toEqual(2);
            expect(result['yellow']).toEqual(2);
            expect(result['purple']).toEqual(1);
        });

        it('returns an empty object for an empty array', () => {
            expect(countBy([], (f: Fruit) => f.color)).toEqual({});
        });

        it('counts a single-item array as 1', () => {
            expect(countBy([fruits[0]!], f => f.color)).toEqual({ red: 1 });
        });

        it('count fruits by price as cheap and expensive', () => {
            const expectedResult = {
                cheap: 3,
                expensive: 2,
            };

            const result = countBy(fruits, f => f.price < 2 ? 'cheap': 'expensive');

            expect(Object.keys(result)).toEqual(Object.keys(expectedResult));
            expect(result['expensive']).toEqual(2);
            expect(result['cheap']).toEqual(3);
        });
    });

    describe('sortBy', () => {
        it('should sort by color in asc', () => {
            const expectedResult = [
                { name: 'grape', color: 'purple', price: 2.5 },
                { name: 'apple', color: 'red', price: 1.5 },
                { name: 'cherry', color: 'red', price: 3.0 },
                { name: 'banana', color: 'yellow', price: 0.75 },
                { name: 'lemon', color: 'yellow', price: 1.0 },
            ];

            const result = sortBy(fruits, f => f.color);

            expect(result).toEqual(expectedResult);
        });

        it('should sort by color in desc', () => {
            const expectedResult = [
                { name: 'banana', color: 'yellow', price: 0.75 },
                { name: 'lemon', color: 'yellow', price: 1.0 },
                { name: 'apple', color: 'red', price: 1.5 },
                { name: 'cherry', color: 'red', price: 3.0 },
                { name: 'grape', color: 'purple', price: 2.5 },
            ];

            const result = sortBy(fruits, f => f.color, 'desc');

            expect(result).toEqual(expectedResult);
        });

        it('should sort by price in asc', () => {
            const expectedResult = [
                { name: 'banana', color: 'yellow', price: 0.75 },
                { name: 'lemon', color: 'yellow', price: 1.0 },
                { name: 'apple', color: 'red', price: 1.5 },
                { name: 'grape', color: 'purple', price: 2.5 },
                { name: 'cherry', color: 'red', price: 3.0 },
            ];

            const result = sortBy(fruits, f => f.price);

            expect(result).toEqual(expectedResult);
        });

        it('should sort by price in desc', () => {
            const expectedResult = [
                { name: 'cherry', color: 'red', price: 3.0 },
                { name: 'grape', color: 'purple', price: 2.5 },
                { name: 'apple', color: 'red', price: 1.5 },
                { name: 'lemon', color: 'yellow', price: 1.0 },
                { name: 'banana', color: 'yellow', price: 0.75 },
            ];

            const result = sortBy(fruits, f => f.price, 'desc');

            expect(result).toEqual(expectedResult);
        });

        it('returns an empty array for an empty array', () => {
            expect(sortBy([], (f: Fruit) => f.color)).toEqual([]);
        });

        it('returns a single-item array unchanged', () => {
            const single = [fruits[0]!];

            expect(sortBy(single, f => f.color)).toEqual(single);
        });

        it('preserves relative order of items with equal keys (stable sort)', () => {
            const sameColor: Fruit[] = [
                { name: 'first', color: 'red', price: 1 },
                { name: 'second', color: 'red', price: 2 },
                { name: 'third', color: 'red', price: 3 },
            ];

            const result = sortBy(sameColor, f => f.color);

            expect(result.map(f => f.name)).toEqual(['first', 'second', 'third']);
        });

        it('does not mutate the original array', () => {
            const original = [...fruits];

            sortBy(fruits, f => f.color, 'desc');

            expect(fruits).toEqual(original);
        });
    });
})