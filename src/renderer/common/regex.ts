const rules = {
    integer: /^\d+$/
}

export const stringIsInteger = (testString: string) => (
    rules.integer.test(testString)
);
