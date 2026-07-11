export function groupBy<T>(
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

export function countBy<T>(
    items: T[],
    keyFn: (item: T) => string
): Record<string, number> {
    const result = {} as Record<string, number>;
    for (const item of items) {
        const keyword = keyFn(item);
        result[keyword] = (result[keyword] || 0) + 1;
    }
    return result;
}

export function sortBy<T>(
    items: T[],
    keyFn: (item: T) => string | number,
    direction: 'asc' | 'desc' = 'asc'
): T[] {

    const dir = direction === 'asc' ? 1 : -1;

    if (items.length === 0) {
        return [];
    }

    return [...items].sort((a, b) => {
        if (typeof keyFn(a) === 'string') {
            return (keyFn(a).toString().localeCompare(keyFn(b).toString())) * dir; // * -1 would be desc
        } else {
            if (keyFn(a) > keyFn(b)) return 1 * dir;
            if (keyFn(a) < keyFn(b)) return -1 * dir;
            return 0;
        }
    });
}