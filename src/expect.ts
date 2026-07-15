export function expect<T>(actual: T): {
    toBe(expected: T): void;
    toEqual(expected: T): void;
    toBeTruthy(): void;
    toThrow(): void;
} {
    return {
        toBe(expected: T) {
            if (!Object.is(actual, expected)) {
                throw new Error(`Expected <actual> to be <expected>`);
            }
        },
        toEqual(expected: T) {
            if (!checkEquality(actual, expected)) {
                throw new Error(`Expected <actual> to be equal to <expected>`);
            }
        },
        toBeTruthy() {
            if (!actual) {
                throw new Error(`Expected <actual> to be truthy`);
            }
        },
        toThrow() {
            try {
                (actual as Function)();
            } catch (_) {
                // expected to throw something
                return;
            }
            // if nothing is thrown, then that is the error
            throw new Error(`Expected <actual> to throw an error`);
        },
    }
}

function checkEquality(actual: unknown, expected: unknown): boolean {
    if (Object.is(actual, expected)) {
        return true;
    }

    if (typeof actual !== typeof expected) {
        return false;
    }

    if (Array.isArray(actual) && Array.isArray(expected)) {
        return checkArrayEquality(actual, expected);
    }

    if (isObject(actual) && isObject(expected)) {
        const actualKeys = Object.keys(actual);
        const expectedKeys = Object.keys(expected);

        if (actualKeys.length !== expectedKeys.length) {
            return false;
        }

        return actualKeys.every(key =>
            Object.prototype.hasOwnProperty.call(expected, key) &&
            checkEquality(actual[key], expected[key])
        );
    }

    return false;
}

// checks order as well
function checkArrayEquality(arr1: unknown[], arr2: unknown[]): boolean {
    return (
        arr1.length === arr2.length &&
        arr1.every((item, i) => checkEquality(item, arr2[i]))
    );
}

function isObject(item: unknown): item is Record<string, unknown> {
    return item !== null && typeof item === 'object';
}