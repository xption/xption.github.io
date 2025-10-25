import { Scene } from './Scene.js';
import { GameBoard } from './GameBoard.js';
import { Sprite } from './Sprite.js';
import { HeroSprite } from './HeroSprite.js';
import { RouteManager } from './manager/RouteManager.js';
import { V2 } from './helper/V2.js';

export class RouteScene extends Scene {
    static TILE_SIZE = 50;

    crossSprite = null;

    heroSprite = null;

    tileSpriteArray = [];

    constructor(ctx) {
        super(ctx);

        GameBoard.getInstance().routeScene = this;
    }

    init() {
        super.init();

        const sprite00 = new Sprite("/assets/route/img/cross.png");
        sprite00.init(0, 0);
        sprite00.scaleX = 2;
        sprite00.scaleY = 2;
        this.addSprite(sprite00);

        const sprite01 = new Sprite("/assets/route/img/cross.png");
        sprite01.init(this.width, 0);
        sprite01.scaleX = 2;
        sprite01.scaleY = 2;
        this.addSprite(sprite01);

        const sprite11 = new Sprite("/assets/route/img/cross.png");
        sprite11.init(this.width, this.height);
        sprite11.scaleX = 2;
        sprite11.scaleY = 2;
        this.addSprite(sprite11);

        const sprite10 = new Sprite("/assets/route/img/cross.png");
        sprite10.init(0, this.height);
        sprite10.scaleX = 2;
        sprite10.scaleY = 2;
        this.addSprite(sprite10);

        this.heroSprite = new HeroSprite("/assets/route/img/hero.png");
        this.heroSprite.init(225, 225);
        this.addSprite(this.heroSprite);

        this.crossSprite = new Sprite("/assets/route/img/cross.png");
        this.crossSprite.init(200, 400);
        this.addSprite(this.crossSprite);

        this.tileSprite = new Sprite("/assets/route/img/tile_0.png");
        this.tileSprite.anchorX = 0;
        this.tileSprite.anchorY = 0;
        this.tileSprite.init(100, 100);
        this.addSprite(this.tileSprite);

        window.addEventListener("click", this.handleMouseClick.bind(this), false);
    }

    handleMouseClick(event) {
        const canvas = event.target;
        if (!canvas.width || !canvas.height) {
            // console.log("点击在 canvas 外");
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const xCanvas = event.clientX - rect.left; // 计算相对于画布的 x 坐标
        const yCanvas = event.clientY - rect.top;  // 计算相对于画布的 y 坐标

        // 确保点击在 canvas 内
        if (xCanvas >= 0 && xCanvas < canvas.clientWidth && yCanvas >= 0 && yCanvas < canvas.clientHeight) {
            // 将 x, y 转换为相对于场景的坐标
            const x = xCanvas / canvas.clientWidth * this.width;
            const y = yCanvas / canvas.clientHeight * this.height;

            this.crossSprite.x = x;
            this.crossSprite.y = y;

            const m = Math.floor(x / RouteScene.TILE_SIZE);
            const n = Math.floor(y / RouteScene.TILE_SIZE);
            const mnArray = RouteManager.getInstance().route(new V2(0, 0), new V2(x, y));
            this.drawRoute(mnArray);
        }
    }

    draw() {
        super.draw();

        for (let row = 0; row < this.height; row += RouteScene.TILE_SIZE) {
            this.drawLine(0, row, this.width, row);
        }

        for (let col = 0; col < this.width; col += RouteScene.TILE_SIZE) {
            this.drawLine(col, 0, col, this.height);
        }
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.save();
        
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.lineWidth = 1;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawRoute(mnArray) {
        for (const tileSprite of this.tileSpriteArray) {
            this.removeSprite(tileSprite);
        }

        for (const mn of mnArray) {
            const tileSprite = new Sprite("/assets/route/img/tile_0.png");
            tileSprite.init(mn.m * RouteScene.TILE_SIZE, mn.n * RouteScene.TILE_SIZE);
            tileSprite.anchorX = 0;
            tileSprite.anchorY = 0;
            this.addSprite(tileSprite);

            this.tileSpriteArray.push(tileSprite);
        }
    }
}