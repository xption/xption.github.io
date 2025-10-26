import { RouteScene } from "../RouteScene.js";

export class MN {
    m = 0;
    n = 0;

    constructor(m, n) {
        this.m = m;
        this.n = n;
    }

    static createWithV2(v2) {
        return new MN(Math.floor(v2.x / RouteScene.TILE_SIZE), Math.floor(v2.y / RouteScene.TILE_SIZE));
    }
}