import IndexedPair from '../../src/class/IndexedPair'

test("String equality", () => {
	const first = new IndexedPair<string>("a", "c");
	const second = new IndexedPair<string>("a", "c");

	expect(first.equals(second)).toBe(true);
});

test("Number equality", () => {
	const first = new IndexedPair<number>(23, 9);
	const second = new IndexedPair<number>(23, 9);

	expect(first.equals(second)).toBe(true);
});

test("String inequality", () => {
	const first = new IndexedPair<string>("a", "q");
	const second = new IndexedPair<string>("a", "c");

	expect(first.equals(second)).toBe(false);
});

test("Number inequality", () => {
	const first = new IndexedPair<number>(1, 2);
	const second = new IndexedPair<number>(3, 4);

	expect(first.equals(second)).toBe(false);
});

test("String equality with empty element", () => {
	const first = new IndexedPair<string>("a", null);
	const second = new IndexedPair<string>("a", null);

	expect(first.equals(second)).toBe(true);
});

test("String inequality with empty element", () => {
	const first = new IndexedPair<string>("a", null);
	const second = new IndexedPair<string>("a", "a");

	expect(first.equals(second)).toBe(false);
});