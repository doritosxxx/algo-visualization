import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class ConnectEqualPairsTransition extends TransitionBase {
    public topIndices: number[];
    public bottomIndices: number[];

    _introduce() {
        this.updateView();
    }

    updateView() {
        const pairArrayBottom = state.get().pairArrayViewClone;
        pairArrayBottom.setIndices(this.bottomIndices);
        pairArrayBottom.drawLines(this.bottomIndices.map((bottom, index) => bottom - index));
    }

    _revoke() {
		state.get().pairArrayViewClone.setIndices([])
		state.get().pairArrayViewClone.removeLines();
	}

    constructor(topIndices: number[], bottomIndices: number[]) {
        super();
        this.topIndices = [...topIndices];
        this.bottomIndices = [...bottomIndices];
    }
}
