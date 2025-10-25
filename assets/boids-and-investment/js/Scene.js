export class Scene {
    ctx = null;

    width = 150;
    height = 150;

    spriteArray = [];

    lastTime = 0;

    constructor(ctx) {
        this.ctx = ctx;
    }

    init() {
        window.addEventListener("resize", () => this.sizeCanvas(), false);
        this.sizeCanvas();

        window.requestAnimationFrame(this.animationLoop);
    }

    sizeCanvas() {
        const canvas = document.getElementById("boids");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        canvas.width = this.width;
        canvas.height = this.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    update(deltaTime) {
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.spriteArray.sort((a, b) => a.z - b.z);

        for (let sprite of this.spriteArray) {
            sprite.draw(this.ctx);
        }
    }

    addSprite(sprite) {
        this.spriteArray.push(sprite);
    }

    animationLoop = (currentTime) => {
        if (this.lastTime === 0) {
            this.lastTime = currentTime;
            window.requestAnimationFrame(this.animationLoop);
            return;
        }

        // 将时间转换为秒
        this.update((currentTime - this.lastTime) / 1000);

        this.draw();
        
        this.lastTime = currentTime;
        window.requestAnimationFrame(this.animationLoop);
    }
}