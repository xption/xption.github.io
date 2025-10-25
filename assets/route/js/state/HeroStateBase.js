import { StateBase } from "./StateBase.js";

export class HeroStateBase extends StateBase {
    heroSprite = null;

    constructor(heroSprite, stateId) {
        super(stateId);

        this.heroSprite = heroSprite;
    }
}