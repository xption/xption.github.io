export class StateMachine {
    curState = null;
    globalState = null;

    constructor(curState, globalState) {
        this.curState = curState;
        this.globalState = globalState;

        this.curState.onEnter();
        this.globalState.onEnter();
    }

    clear() {
        if (this.curState) {
            this.curState.onExit();
            this.curState.onClear();
            this.curState = null;
        }

        if (this.globalState) {
            this.globalState.onExit();
            this.globalState.onClear();
            this.globalState = null;
        }
    }

    update() {
        if (this.curState) {
            this.curState.onUpdate();
        }

        if (this.globalState) {
            this.globalState.onUpdate();
        }
    }

    changeState(state) {
        if (this.curState) {
            this.curState.onExit();
            this.curState.onClear();
        }

        this.curState = state;
        if (this.curState) {
            this.curState.onEnter();
        }
    }

    isInState(stateId) {
        return this.getCurStateId() === stateId;
    }

    getCurStateId() {
        return this.curState ? this.curState.stateId : -1;
    }
}