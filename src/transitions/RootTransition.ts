import TransitionBase from "./TransitionBase";

export default class RootTransition extends TransitionBase {
    description: string = "";
    _introduce() {
        throw new Error("Method shouldn't be invoked.");
    }
    _revoke() {
        throw new Error("Method shouldn't be invoked.");
    }
}
