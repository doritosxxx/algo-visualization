import TransitionBase from "./TransitionBase";

export default class FinalMessageTransition extends TransitionBase {
    description: string;

    constructor(string: string) {
        super();
        this.description = `Сжатое суффиксное дерево для строки "${string}" построено`;
    }

    _introduce() {
        // Does nothing
    }
    _revoke() {
        // Does nothing
    }
}
