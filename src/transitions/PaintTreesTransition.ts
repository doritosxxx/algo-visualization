import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class PaintTreesTransition extends TransitionBase {
    description: string = "Покрасим четное и нечетное дерево в отдельные цвета";

    _introduce() {
        const even = state.get().evenTreeView;
        even.setColor("even");
        even.redraw();

        const odd = state.get().oddTreeView;
        odd.setColor("odd");
        odd.redraw();
    }

    _revoke() {
        const even = state.get().evenTreeView;
        const odd = state.get().oddTreeView;

        even.setColor(null);
        even.redraw();
        odd.setColor(null);
        odd.redraw();
    }
}
