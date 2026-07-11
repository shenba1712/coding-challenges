function groupBy<T>(
    items: T[],
    keyFn: (item: T) => string
): Record<string, T[]> {
    return items.reduce((acc, item) => {
        const keyword = keyFn(item);
        if (!acc[keyword]) {
            acc[keyword] = [];
        }
        acc[keyword].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

function countBy<T>(
    items: T[],
    keyFn: (item: T) => string
): Record<string, number> {
    return items.reduce((acc, item) => {
        const keyword = keyFn(item);
       // acc[keyword] = !acc[keyword] ? 1 : acc[keyword] + 1; -> yet another way to increment
        acc[keyword] = (acc[keyword] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
}

function sortBy<T>(
    items: T[],
    keyFn: (item: T) => string | number,
    direction: 'asc' | 'desc' = 'asc'
): T[] {

    const dir = direction === 'asc' ? 1 : -1;

    if (items.length === 0) {
        return [];
    }

    return [...items].sort((a, b) => {
        if (keyFn(a) === 'string') {
            return (keyFn(a).toString().localeCompare(keyFn(b).toString())) * dir; // * -1 would be desc
        } else {
            if (keyFn(a) > keyFn(b)) return 1 * dir;
            if (keyFn(a) < keyFn(b)) return -1 * dir;
            return 0;
        }
    });
}