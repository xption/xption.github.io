export class StateBase {
    stateId = 0;

    constructor(stateId) {
        this.stateId = stateId;
    }

    onClear() {}
    onEnter() {}
    onExit() {}
    onUpdate() {}
}