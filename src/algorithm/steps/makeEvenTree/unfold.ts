import { Edge, Leaf, Pair, Root } from "../../class";
import { character } from "../../types";

export default function unfold<T extends character>(tree: Root<number>, pairs: Pair<T>[]): Root<T> {
    return _unfold(tree, pairs);
}

function _unfold<T extends character>(edge: Edge<number>, pairs: Pair<T>[]): Edge<T> {
    let unfolded: Edge<T> | null = null;
    const letters = edge.label.map((letter) => pairs[letter]).flatMap((pair) => [pair.first, pair.second]);

    if (edge instanceof Root) {
        unfolded = new Root<T>();
    } else if (edge instanceof Leaf) {
        unfolded = new Leaf(letters, (edge as Leaf<T>).suffixIndex);
    } else {
        unfolded = new Edge<T>(letters);
    }

    unfolded.id = edge.id;

    unfolded.children = edge.children.map((child) => _unfold<T>(child, pairs));

    return unfolded;
}
