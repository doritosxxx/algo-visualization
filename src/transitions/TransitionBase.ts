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

	/**
	 * Cleanup function before next transition being introduced. 
	 */
	_leave(){};
	/**
	 * Rollback function after next transition being revoked. 
	 * Used to return changes made by _leave method. 
	 */
	_rollback(){};

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
		this.previous?._leave();
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
		this.previous._rollback();
        this.introduced = false;
    }
}
