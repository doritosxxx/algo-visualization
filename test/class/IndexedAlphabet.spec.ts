import IndexedAlphabet from "../../src/class/IndexedAlphabet";

const alphabet = new IndexedAlphabet("banana");

test("Check if characters exist in the alphabet", () => {
    for (const char of "abn") {
        expect(alphabet.getIndex(char)).not.toBeUndefined();
    }
});

test("Check Expected indexes", () => {
    expect(alphabet.getIndex("b")).toBe(0);
    expect(alphabet.getIndex("a")).toBe(1);
    expect(alphabet.getIndex("n")).toBe(2);
});

test("Pass non-alphabet characters", () => {
    for (const char of "1056=-sdutmvpgzl,") {
        expect(() => alphabet.getIndex(char)).toThrow();
    }
});

test("Pass string instead of character", () => {
    expect(() => alphabet.getIndex("some long string")).toThrow();
});

test("Pass empty string instead of character", () => {
    expect(() => alphabet.getIndex("")).toThrow();
});
