import TransitionBase from "./TransitionBase";
import * as state from "../state";
import TreeView from "../views/TreeView";

export default class HideOddEvenTreesTransition extends TransitionBase {
    description: string = "Начитаем удаление двойных ребер в новом дереве.";

    private even: TreeView;
    private odd: TreeView;

    _introduce() {
        const svg = document.querySelector("#svg") as SVGSVGElement;
        const height = state.get().svg.height;
        state.get().svg.centerBoundBox(0, 0, 400, height);

        this.odd = state.get().oddTreeView;
        this.even = state.get().evenTreeView;
        const merged = state.get().mergedTreeView;

        this.even.container.transition().duration(400).attr("x", -1200);
        this.odd.container.transition().duration(400).attr("x", -800);
        merged.container.transition().duration(400).attr("x", 0);

        this.even.container.remove();
        this.odd.container.remove();
        state.get().evenTreeView = null;
        state.get().oddTreeView = null;
    }

    _revoke() {
        state.get().evenTreeView = this.even;
        state.get().oddTreeView = this.odd;
        const merged = state.get().mergedTreeView;
        const svg = document.querySelector("#svg") as SVGSVGElement;
        const height = state.get().svg.height;

        svg.appendChild(this.even.container.node());
        svg.appendChild(this.odd.container.node());
        this.even.container.attr("x", 0);
        this.odd.container.attr("x", 400);
        merged.container.attr("x", 800);

        state.get().svg.centerBoundBox(0, 0, 3 * 400, height);
    }
}
