import { BoidDrawer } from './BoidsDrawer.js';
import { BoidCalculator } from './BoidsCalculator.js';

export class BoidsSimulator {
    constructor() {
        // 基础配置
        this.width = 150;
        this.height = 150;
        this.numBoids = 100;
        this.visualRange = 100;
        this.centeringFactor = 0.005;
        this.avoidFactor = 0.05;
        this.matchingFactor = 0.05;
        
        this.boids = [];
        this.lastTime = 0;
    }

    initBoids() {
        for (let i = 0; i < this.numBoids; i++) {
            this.boids.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                dx: Math.random() * 10 - 5,
                dy: Math.random() * 10 - 5,
                history: []
            });
        }
    }

    sizeCanvas() {
        const canvas = document.getElementById("boids");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        canvas.width = this.width;
        canvas.height = this.height;
    }

    animationLoop = (currentTime) => {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // 更新每个 boid
        for (let boid of this.boids) {
            BoidCalculator.updateBoid(boid, this.boids, {
                width: this.width,
                height: this.height,
                visualRange: this.visualRange,
                centeringFactor: this.centeringFactor,
                avoidFactor: this.avoidFactor,
                matchingFactor: this.matchingFactor
            });
        }

        // 绘制
        const ctx = document.getElementById("boids").getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
        for (let boid of this.boids) {
            BoidDrawer.drawBoid(ctx, boid);
        }

        window.requestAnimationFrame(this.animationLoop);
    }

    updateParameters(params) {
        if (params.centeringFactor !== undefined) this.centeringFactor = params.centeringFactor;
        if (params.avoidFactor !== undefined) this.avoidFactor = params.avoidFactor;
        if (params.matchingFactor !== undefined) this.matchingFactor = params.matchingFactor;
        if (params.visualRange !== undefined) this.visualRange = params.visualRange;
    }

    updateSliderValues() {
        document.getElementById('centeringFactorValue').textContent = this.centeringFactor;
        document.getElementById('avoidFactorValue').textContent = this.avoidFactor;
        document.getElementById('matchingFactorValue').textContent = this.matchingFactor;
        document.getElementById('visualRangeValue').textContent = this.visualRange;
    }

    initEventListeners() {
        // 凝聚性滑块
        document.getElementById('centeringFactor').addEventListener('input', (e) => {
            simulator.updateParameters({
                centeringFactor: parseFloat(e.target.value)
            });
            simulator.updateSliderValues();
        });

        // 排斥性滑块
        document.getElementById('avoidFactor').addEventListener('input', (e) => {
            simulator.updateParameters({
                avoidFactor: parseFloat(e.target.value)
            });
            simulator.updateSliderValues();
        });

        // 同向性滑块
        document.getElementById('matchingFactor').addEventListener('input', (e) => {
            simulator.updateParameters({
                matchingFactor: parseFloat(e.target.value)
            });
            simulator.updateSliderValues();
        });

        // 视野范围滑块
        document.getElementById('visualRange').addEventListener('input', (e) => {
            simulator.updateParameters({
                visualRange: parseInt(e.target.value)
            });
            simulator.updateSliderValues();
        });
    }

    init() {
        window.addEventListener("resize", () => this.sizeCanvas(), false);
        this.sizeCanvas();
        this.initBoids();
        this.updateSliderValues();
        this.initEventListeners();
        window.requestAnimationFrame(this.animationLoop);
    }
}