export class Sprite {
    // 精灵图片
    image = null;

    // 坐标向量
    x = 0;
    y = 0;
    z = 100;

    // 旋转角度
    rotation = 0;

    // 缩放
    scaleX = 1;
    scaleY = 1;

    // 透明度
    opacity = 1;

    // 锚点
    anchorX = 0.5;
    anchorY = 0.5;

    constructor(src) {
        this.image = new Image();
        this.image.src = src;
    }

    init(x, y) {
        this.x = x;
        this.y = y;
    }

    clear() {
    }

    update(deltaTime) {
    }

    draw(ctx) {
        ctx.save();
        
        // 移动到精灵位置
        ctx.translate(this.x, this.y);

        // 旋转
        ctx.rotate(this.rotation);

        // 缩放
        ctx.scale(this.scaleX, this.scaleY);

        // 透明度
        ctx.globalAlpha = this.opacity;

        // 绘制图片
        // drawImage(image, dx, dy, dWidth, dHeight)
        // 参数分别是: 图片对象, x偏移, y偏移, 宽度, 高度
        ctx.drawImage(
            this.image,
            -this.image.width * this.anchorX,       // x偏移量(图片宽度的一半)
            -this.image.height * this.anchorY,      // y偏移量(图片高度的一半)
            this.image.width,                       // 图片宽度
            this.image.height                       // 图片高度
        );
        
        ctx.restore();

        /*
        // 绘制箭头
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);
        ctx.translate(-this.x, -this.y);

        ctx.fillStyle = "#558cf4";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 15, this.y + 5);
        ctx.lineTo(this.x - 15, this.y - 5);
        ctx.lineTo(this.x, this.y);
        ctx.fill();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        */
    }
}