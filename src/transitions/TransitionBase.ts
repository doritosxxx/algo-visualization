export default abstract class TransitionBase {
    public next: TransitionBase = null;
    public previous: TransitionBase = null;

    public append(transition: TransitionBase) {
        this.next = transition;
        transition.previous = this;
    }

    private introduced = false;

    abstract _introduce();
    abstract _revoke();

    introduceNext(): TransitionBase {
        if (this.next == null) {
            throw new Error("Next transition does not exist");
        }
        this.next.introduce();
        return this.next;
    }

    introduce() {
		// Debug.
        console.warn("Introduced: " + this.constructor.name);
        this.introduced = true;
        this._introduce();
    }

    revoke() {
        if (!this.introduced) {
            throw new Error("Can't revoke transition before it was introduced");
        }
        if (this.previous == null) {
            throw new Error("Can't revoke to null state");
        }
        this._revoke();
        this.introduced = false;
    }
}
