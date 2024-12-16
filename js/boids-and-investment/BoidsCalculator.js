export class BoidCalculator {
    static distance(boid1, boid2) {
        return Math.sqrt(
            (boid1.x - boid2.x) * (boid1.x - boid2.x) + 
            (boid1.y - boid2.y) * (boid1.y - boid2.y)
        );
    }

    static keepWithinBounds(boid, width, height) {
        const margin = 200;
        const turnFactor = 1;

        if (boid.x < margin) boid.dx += turnFactor;
        if (boid.x > width - margin) boid.dx -= turnFactor;
        if (boid.y < margin) boid.dy += turnFactor;
        if (boid.y > height - margin) boid.dy -= turnFactor;
    }

    static flyTowardsCenter(boid, boids, params) {
        let centerX = 0;
        let centerY = 0;
        let numNeighbors = 0;

        for (let otherBoid of boids) {
            if (BoidCalculator.distance(boid, otherBoid) < params.visualRange) {
                centerX += otherBoid.x;
                centerY += otherBoid.y;
                numNeighbors += 1;
            }
        }

        if (numNeighbors) {
            centerX = centerX / numNeighbors;
            centerY = centerY / numNeighbors;
            boid.dx += (centerX - boid.x) * params.centeringFactor;
            boid.dy += (centerY - boid.y) * params.centeringFactor;
        }
    }

    static avoidOthers(boid, boids, params) {
        const minDistance = 20; // 最小距离
        let moveX = 0;
        let moveY = 0;

        for (let otherBoid of boids) {
            if (otherBoid !== boid) {
                if (BoidCalculator.distance(boid, otherBoid) < minDistance) {
                    moveX += boid.x - otherBoid.x;
                    moveY += boid.y - otherBoid.y;
                }
            }
        }

        boid.dx += moveX * params.avoidFactor;
        boid.dy += moveY * params.avoidFactor;
    }

    static matchVelocity(boid, boids, params) {
        let avgDX = 0;
        let avgDY = 0;
        let numNeighbors = 0;

        for (let otherBoid of boids) {
            if (BoidCalculator.distance(boid, otherBoid) < params.visualRange) {
                avgDX += otherBoid.dx;
                avgDY += otherBoid.dy;
                numNeighbors += 1;
            }
        }

        if (numNeighbors) {
            avgDX = avgDX / numNeighbors;
            avgDY = avgDY / numNeighbors;

            boid.dx += (avgDX - boid.dx) * params.matchingFactor;
            boid.dy += (avgDY - boid.dy) * params.matchingFactor;
        }
    }

    static limitSpeed(boid) {
        const speedLimit = 15;
        const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);

        if (speed > speedLimit) {
            boid.dx = (boid.dx / speed) * speedLimit;
            boid.dy = (boid.dy / speed) * speedLimit;
        }
    }

    static updateBoid(boid, boids, params) {
        BoidCalculator.flyTowardsCenter(boid, boids, params);
        BoidCalculator.avoidOthers(boid, boids, params);
        BoidCalculator.matchVelocity(boid, boids, params);
        BoidCalculator.limitSpeed(boid);
        BoidCalculator.keepWithinBounds(boid, params.width, params.height);

        boid.x += boid.dx;
        boid.y += boid.dy;
        boid.history.push([boid.x, boid.y]);
        boid.history = boid.history.slice(-50);
    }
}