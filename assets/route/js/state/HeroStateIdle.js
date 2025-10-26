import { HeroStateBase } from "./HeroStateBase.js";

export class HeroStateIdle extends HeroStateBase {
    constructor(heroSprite) {
        super(heroSprite, 0);
    }

    onClear() {
        super.onClear();
    }

    onEnter() {
        super.onEnter();
    }

    onExit() {
        super.onExit();
    }

    onUpdate() {
        super.onUpdate();
    }
}