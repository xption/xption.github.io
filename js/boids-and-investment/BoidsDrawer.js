export class BoidDrawer {
    static DRAW_TRAIL = false;

    static drawBoid(ctx, boid) {
        const angle = Math.atan2(boid.dy, boid.dx);
        ctx.translate(boid.x, boid.y);
        ctx.rotate(angle);
        ctx.translate(-boid.x, -boid.y);
        ctx.fillStyle = "#558cf4";
        ctx.beginPath();
        ctx.moveTo(boid.x, boid.y);
        ctx.lineTo(boid.x - 15, boid.y + 5);
        ctx.lineTo(boid.x - 15, boid.y - 5);
        ctx.lineTo(boid.x, boid.y);
        ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        if (BoidDrawer.DRAW_TRAIL) {
            this.drawTrail(ctx, boid);
        }
    }

    static drawTrail(ctx, boid) {
        ctx.strokeStyle = "#558cf466";
        ctx.beginPath();
        ctx.moveTo(boid.history[0][0], boid.history[0][1]);
        for (const point of boid.history) {
            ctx.lineTo(point[0], point[1]);
        }
        ctx.stroke();
    }
}