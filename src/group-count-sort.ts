function groupBy<T>(
    items: T[],
    keyFn: (item: T) => string
): Record<string, T[]> {
    return items.reduce((acc, item) => {
        const keyword = keyFn(item);
        let groupedItems: T[] = [];
        if (acc[keyword]) {
            // @ts-ignore
            groupedItems = acc[keyword];
        }
        if (typeof item === 'object' && item !== null && Object.values(item).includes(keyword)) {
            groupedItems.push(item);
        }
        acc[keyword] = groupedItems;
        return acc;
    }, {} as Record<string, T[]>);
}

function countBy<T>(
    items: T[],
    keyFn: (item: T) => string
): Record<string, number> {
    return items.reduce((acc, item) => {
        const keyword = keyFn(item);
        let count: number = 0;
        if (acc.hasOwnProperty(keyword)) {
            //@ts-ignore
            count = acc[keyword];
        }
        if (typeof item === 'object' && item !== null && Object.values(item).includes(keyword)) {
            count++;
        }
        acc[keyword] = count;
        return acc;
    }, {} as Record<string, number>);
}

function sortBy<T>(
    items: T[],
    keyFn: (item: T) => string | number,
    direction: 'asc' | 'desc' = 'asc'
): T[] {

    if (items.length === 0) {
        return [];
    }

    //@ts-ignore
    const keyType = keyFn(items[0]);

    if (typeof keyType === 'string') {
        if (direction === 'asc') {
            return [...items].sort((a, b) => {
                return keyFn(a).toString().localeCompare(keyFn(b).toString());
            });
        } else  {
            return [...items].sort((a, b) => {
                return keyFn(b).toString().localeCompare(keyFn(a).toString());
            });
        }
    } else {
        if (direction === 'asc') {
            return [...items].sort((a, b) => {
                if (keyFn(a) > keyFn(b)) return 1;
                if (keyFn(a) < keyFn(b)) return -1;
                return 0;
            });
        } else {
            return [...items].sort((a, b) => {
                if (keyFn(a) > keyFn(b)) return -1;
                if (keyFn(a) < keyFn(b)) return 1;
                return 0;
            });
        }
    }
}

// test
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

const answerGroup = groupBy(fruits, f => f.color);
const answerCount = countBy(fruits, f => f.color);
const answerSortByColorAsc = sortBy(fruits, f => f.color);
const answerSortByPriceAsc = sortBy(fruits, f => f.price);
const answerSortByColorDesc = sortBy(fruits, f => f.color, 'desc');
const answerSortByPriceDesc = sortBy(fruits, f => f.price, "desc");

console.log(answerGroup);
console.log(answerCount);
console.log([...answerSortByColorAsc]);
console.log([...answerSortByPriceAsc]);
console.log([...answerSortByPriceDesc]);
console.log([...answerSortByColorDesc]);