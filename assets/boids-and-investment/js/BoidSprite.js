import { Sprite } from "./Sprite.js";
import { GameBoard } from "./GameBoard.js";

export class BoidSprite extends Sprite {
    // 方向向量
    dx = 0;
    dy = 0;

    history = [];

    constructor(imgSrc) {
        super(imgSrc);
    }

    init(x, y, dx, dy) {
        super.init(x, y);

        this.dx = dx;
        this.dy = dy;
    }

    clear() {
        super.clear();
    }

    update() {
        this.flyTowardsCenter();
        this.avoidOthers();
        this.matchVelocity();
        this.limitSpeed();
        this.keepWithinBounds();

        this.x += this.dx;
        this.y += this.dy;
        this.history.push([this.x, this.y]);
        this.history = this.history.slice(-50);

        this.rotation = Math.atan2(this.dy, this.dx) - Math.PI / 2;
    }

    distance(boid1, boid2) {
        return Math.sqrt(
            (boid1.x - boid2.x) * (boid1.x - boid2.x) + 
            (boid1.y - boid2.y) * (boid1.y - boid2.y)
        );
    }

    keepWithinBounds() {
        const boidScene = GameBoard.getInstance().boidScene;

        const margin = 200;
        const turnFactor = 1;

        if (this.x < margin) this.dx += turnFactor;
        if (this.x > boidScene.width - margin) this.dx -= turnFactor;
        if (this.y < margin) this.dy += turnFactor;
        if (this.y > boidScene.height - margin) this.dy -= turnFactor;
    }

    flyTowardsCenter() {
        const boidScene = GameBoard.getInstance().boidScene;

        let centerX = 0;
        let centerY = 0;
        let numNeighbors = 0;

        for (let otherBoid of boidScene.boidSpriteArray) {
            if (this.distance(this, otherBoid) < boidScene.visualRange) {
                centerX += otherBoid.x;
                centerY += otherBoid.y;
                numNeighbors += 1;
            }
        }

        if (numNeighbors) {
            centerX = centerX / numNeighbors;
            centerY = centerY / numNeighbors;
            this.dx += (centerX - this.x) * boidScene.centeringFactor;
            this.dy += (centerY - this.y) * boidScene.centeringFactor;
        }
    }

    avoidOthers() {
        const boidScene = GameBoard.getInstance().boidScene;
        
        const minDistance = 20; // 最小距离
        let moveX = 0;
        let moveY = 0;

        for (let otherBoid of boidScene.boidSpriteArray) {
            if (otherBoid !== this) {
                if (this.distance(this, otherBoid) < minDistance) {
                    moveX += this.x - otherBoid.x;
                    moveY += this.y - otherBoid.y;
                }
            }
        }

        this.dx += moveX * boidScene.avoidFactor;
        this.dy += moveY * boidScene.avoidFactor;
    }

    matchVelocity() {
        const boidScene = GameBoard.getInstance().boidScene;

        let avgDX = 0;
        let avgDY = 0;
        let numNeighbors = 0;

        for (let otherBoid of boidScene.boidSpriteArray) {
            if (this.distance(this, otherBoid) < boidScene.visualRange) {
                avgDX += otherBoid.dx;
                avgDY += otherBoid.dy;
                numNeighbors += 1;
            }
        }

        if (numNeighbors) {
            avgDX = avgDX / numNeighbors;
            avgDY = avgDY / numNeighbors;

            this.dx += (avgDX - this.dx) * boidScene.matchingFactor;
            this.dy += (avgDY - this.dy) * boidScene.matchingFactor;
        }
    }

    limitSpeed() {
        const speedLimit = 15;
        const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        if (speed > speedLimit) {
            this.dx = (this.dx / speed) * speedLimit;
            this.dy = (this.dy / speed) * speedLimit;
        }
    }

    draw(ctx) {
        super.draw(ctx);
        
        this.drawTrail(ctx);
    }

    drawTrail(ctx) {
        if (this.history.length > 0) {
            ctx.strokeStyle = "#558cf466";
            ctx.beginPath();
            ctx.moveTo(this.history[0][0], this.history[0][1]);
            for (const point of this.history) {
                ctx.lineTo(point[0], point[1]);
            }
            ctx.stroke();
        }
    }
}