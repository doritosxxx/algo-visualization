import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class ConnectEqualPairsTransition extends TransitionBase {
	description: string = "Для каждой пары во втором массиве находим ее номер из первого массива";
    public topIndices: number[];
    public bottomIndices: number[];

    _introduce() {
        this.updateView();
    }

    updateView() {
        state.get().pairArrayViewClone.setIndices(this.bottomIndices);
        state.get().pairArrayViewClone.drawLines(this.bottomIndices);
    }

    _revoke() {
        state.get().pairArrayViewClone.setIndices([]);
        state.get().pairArrayViewClone.removeLines();
    }

    _leave() {
        state.get().pairArrayViewClone.removeLines();
    }

    _rollback() {
		state.get().pairArrayViewClone.drawLines(this.bottomIndices);
	}

    constructor(topIndices: number[], bottomIndices: number[]) {
        super();
        this.topIndices = [...topIndices];
        this.bottomIndices = [...bottomIndices];
    }
}
