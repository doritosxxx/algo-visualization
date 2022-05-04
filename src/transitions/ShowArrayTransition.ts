import * as d3 from "d3";
import * as state from "../state";
import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import { TransitionBase, PushArrayToStackTransition } from ".";

export default class ShowArrayTransition extends TransitionBase {
    description: string = "Создаем новую строку, состоящую из номеров пар. Размер строки уменьшился в 2 раза";
    public readonly pairs: Pair<character>[];

    // Previous: RootTransition
    _introduce() {
        const pairArrayView = new PairArrayView();
        state.get().pairArrayView = pairArrayView;
        if (this.previous instanceof PushArrayToStackTransition) {
            pairArrayView.showAsPairArray();
        } else {
            pairArrayView.showAsArray();
            this.description = "На вход алгоритма подается строка";
            state.get().statusbar.setString(this.description);
        }
        d3.select(".board .layout-vertical-stack").append(() => pairArrayView.container.node());

        // Triggers transition if needed.
        setTimeout(() => pairArrayView.showAsArray(), 0);
        pairArrayView.setPairs(this.pairs);
    }

    _revoke() {
        state.get().pairArrayView.container.remove();
        state.get().pairArrayView = null;
    }

    _leave(): void {
        state.get().pairArrayView.showAsPairArray();
    }

    _rollback(): void {
        state.get().pairArrayView.showAsArray();
    }

    public constructor(pairs: Pair<character>[]) {
        super();
        this.pairs = [...pairs];
    }
}
