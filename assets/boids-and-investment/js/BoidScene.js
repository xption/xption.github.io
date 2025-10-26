import { Scene } from "./Scene.js";
import { BoidSprite } from "./BoidSprite.js";
import { GameBoard } from "./GameBoard.js";

export class BoidScene extends Scene {
    boidSpriteArray = [];

    constructor(ctx, params) {
        super(ctx);

        this.visualRange = params.visualRange;
        this.centeringFactor = params.centeringFactor;
        this.avoidFactor = params.avoidFactor;
        this.matchingFactor = params.matchingFactor;

        GameBoard.getInstance().boidScene = this;
    }

    init() {
        super.init();

        for (let i = 0; i < 100; i++) {
            const boidSprite = new BoidSprite("/assets/boids-and-investment/img/boid.png");
            boidSprite.init(Math.random() * this.width,
                            Math.random() * this.height,
                            Math.random() * 10 - 5,
                            Math.random() * 10 - 5);
            this.addSprite(boidSprite);

            this.boidSpriteArray.push(boidSprite);
        }

        /*
        // 测试
        const boidSprite = new BoidSprite("/assets/boids-and-investment/img/test.png");
        boidSprite.init(0, 0, 0, 0);
        boidSprite.opacity = 0.5;
        this.addSprite(boidSprite);

        const boidSprite2 = new BoidSprite("/assets/boids-and-investment/img/boid.png");
        boidSprite2.init(0, 0, 0, 0);
        this.addSprite(boidSprite2);
        */
    }

    // 因为是网页，所以不会被调用
    clear() {
        super.clear();

        this.boidSpriteArray = [];

        GameBoard.getInstance().boidScene = null;
    }

    update(deltaTime) {
        super.update(deltaTime);

        for (const boidSprite of this.boidSpriteArray) {
            boidSprite.update();
        }
    }

    updateCenteringFactor(value) {
        this.centeringFactor = value;
    }

    updateAvoidFactor(value) {
        this.avoidFactor = value;
    }

    updateMatchingFactor(value) {
        this.matchingFactor = value;
    }

    updateVisualRange(value) {
        this.visualRange = value;
    }
}