// Checks the input against the location regex developed
export function verifyLocationRegex(input: string): boolean {
    let regex = /\([1-9]+,[1-9]+,[1-9]+,[1-9]+-[1-8]\)/i;
    return regex.test(input);
}