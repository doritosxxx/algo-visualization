import IndexedPair from "../class/IndexedPair";
import { character } from "../types";

class Indexer<T extends character> {
    private readonly buckets: Record<T, Record<T, number>> = {} as Record<T, Record<T, number>>;

    public addIndex(pair: IndexedPair<T>, index: number) : void {
        if (this.buckets[pair.first] === undefined) {
            this.buckets[pair.first] = {} as Record<T, number>;
        }
        this.buckets[pair.first][pair.second] = index;
    }

    public getIndex(pair: IndexedPair<T>) : number {
        return this.buckets[pair.first][pair.second];
    }
}

export default function reindex<T extends character>(pairs: IndexedPair<T>[], indexes: IndexedPair<T>[]): number[] {
    const indexer = new Indexer();

    indexes.forEach((pair, index) => indexer.addIndex(pair, index));

    const result: number[] = new Array(pairs.length);
    for (let i = 0; i < result.length; i++) {
		result[i] = indexer.getIndex(pairs[i]);
	}

	return result;
}
