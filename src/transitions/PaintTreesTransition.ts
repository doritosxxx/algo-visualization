import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class PaintTreesTransition extends TransitionBase {
    description: string = "Покрасим четное и нечетное дерево в отдельные цвета";

    _introduce() {
        const even = state.get().evenTreeView;
        even.tree.setSubtreeColor("even");
        even.redraw();

        const odd = state.get().oddTreeView;
        odd.tree.setSubtreeColor("odd");
        odd.redraw();
    }

    _revoke() {
        const even = state.get().evenTreeView;
        const odd = state.get().oddTreeView;

        even.tree.setSubtreeColor(null);
        even.redraw();
        odd.tree.setSubtreeColor(null);
        odd.redraw();
    }
}
