import Pair from '../../src/algorithm/class/Pair'

test("String equality", () => {
	const first = new Pair<string>("a", "c");
	const second = new Pair<string>("a", "c");

	expect(first.equals(second)).toBe(true);
});

test("Number equality", () => {
	const first = new Pair<number>(23, 9);
	const second = new Pair<number>(23, 9);

	expect(first.equals(second)).toBe(true);
});

test("String inequality", () => {
	const first = new Pair<string>("a", "q");
	const second = new Pair<string>("a", "c");

	expect(first.equals(second)).toBe(false);
});

test("Number inequality", () => {
	const first = new Pair<number>(1, 2);
	const second = new Pair<number>(3, 4);

	expect(first.equals(second)).toBe(false);
});

test("String equality with empty element", () => {
	const first = new Pair<string>("a", null);
	const second = new Pair<string>("a", null);

	expect(first.equals(second)).toBe(true);
});

test("String inequality with empty element", () => {
	const first = new Pair<string>("a", null);
	const second = new Pair<string>("a", "a");

	expect(first.equals(second)).toBe(false);
});