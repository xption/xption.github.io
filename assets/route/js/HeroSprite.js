import { Sprite } from './Sprite.js';
import { HeroStateGlobal } from './state/HeroStateGlobal.js';
import { HeroStateIdle } from './state/HeroStateIdle.js';
import { StateMachine } from './state/StateMachine.js';

export class HeroSprite extends Sprite {
    stateMachine = null;

    constructor(src) {
        super(src);
    }

    init(x, y) {
        super.init(x, y);

        this.anchorX = 0.5;
        this.anchorY = 1;

        this.stateMachine = new StateMachine(new HeroStateIdle(this), new HeroStateGlobal(this));
    }

    update() {
        this.stateMachine.update();
    }
}