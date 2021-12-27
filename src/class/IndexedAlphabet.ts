export default class IndexedAlphabet {
    private readonly indexes: Record<string, number> = {};
    private readonly size = 0;

    public constructor(input: string) {
        for (const char of input) {
            if (this.indexes[char] === undefined) {
                this.indexes[char] = this.size;
                this.size++;
            }
        }
    }

    public getIndex(char: string): number {
        if (char.length != 1) {
            throw new Error("Incorrect string length. Length 1 expected.");
        }
        if (this.indexes[char] === undefined) {
            throw new Error("Character not found.");
        }

        return this.indexes[char];
    }
}
