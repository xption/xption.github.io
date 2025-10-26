import { MN } from '../helper/MN.js';

class RouteNode {
    m = 0;
    n = 0;
    gScore = 0;
    fScore = 0;
    cameFrom = null;

    constructor(m, n) {
        this.m = m;
        this.n = n;
    }

    calcTotalScore() {
        return this.gScore + this.fScore;
    }
}

export class RouteInfo {
    _pointArray = [];

    addPoint(point) {
        this._pointArray.push(point);
    }

    getPointArray() {
        return this._pointArray;
    }
}

export class RouteManager {
    static _instance = null;

    // 静态方法获取单例实例
    static getInstance() {
        if (!RouteManager._instance) {
            RouteManager._instance = new RouteManager();
        }
    
        return RouteManager._instance;
    }

    route(beginV2, endV2) {
        const beginMN = MN.createWithV2(beginV2);
        const endMN = MN.createWithV2(endV2);

        const mnArray = this.routeMN(beginMN, endMN);
        return mnArray;

        // const routeInfo = new RouteInfo();
        // routeInfo.addPoint(beginV2);
        // routeInfo.addPoint(endV2);
        // return routeInfo;
    }

    routeMN(beginMN, endMN) {
        const calcFScore = (mn1, mn2) => {
            return Math.abs(mn1.m - mn2.m) + Math.abs(mn1.n - mn2.n);
        };

        const findPath = (beginMN, endMN) => {
            console.log("开始寻路: ", beginMN, endMN);

            let openMap = new Map();
            let closeMap = new Map();

            const beginKey = calcTileKey(beginMN.m, beginMN.n);
            
            const beginNode = new RouteNode(beginMN.m, beginMN.n);
            beginNode.gScore = 0;
            beginNode.fScore = calcFScore(beginMN, endMN);
            openMap.set(beginKey, beginNode);

            while (openMap.size > 0) {
                // 查找 fScore 最小的格子
                let currentNode = null;
                let minScore = Infinity;

                for (let [_, routeNodeIt] of openMap) {
                    if (routeNodeIt.calcTotalScore() < minScore) {
                        minScore = routeNodeIt.calcTotalScore();
                        currentNode = routeNodeIt;
                    }
                }

                const currentKey = calcTileKey(currentNode.m, currentNode.n);
                openMap.delete(currentKey);
                closeMap.set(currentKey, currentNode);

                // 获取当前格子的邻居
                const neighborOffsetArray = [
                    { m: -1, n: 0 },
                    { m: 1, n: 0 },
                    { m: 0, n: -1 },
                    { m: 0, n: 1 },
                ];

                const neighborMNArray = [];
                
                for (const neighborOffset of neighborOffsetArray) {
                    const neighborM = currentNode.m + neighborOffset.m;
                    const neighborN = currentNode.n + neighborOffset.n;
                    if (neighborM < 0 || neighborM >= 10 ||
                        neighborN < 0 || neighborN >= 10) {
                        continue;
                    }

                    const neighborKey = calcTileKey(neighborM, neighborN);
                    if (openMap.has(neighborKey) || closeMap.has(neighborKey)) {
                        continue;
                    }

                    neighborMNArray.push(new MN(neighborM, neighborN));
                }

                // 遍历处理邻居
                for (const neighborMN of neighborMNArray) {
                    const neighborKey = calcTileKey(neighborMN.m, neighborMN.n);

                    const neighborNode = new RouteNode(neighborMN.m, neighborMN.n);
                    neighborNode.gScore = currentNode.gScore + 1;
                    neighborNode.fScore = calcFScore(neighborNode, endMN);
                    neighborNode.cameFrom = currentNode;
                    openMap.set(neighborKey, neighborNode);

                    // 判断到达终点
                    if (neighborMN.m === endMN.m && neighborMN.n === endMN.n) {
                        console.log("到达终点: ", neighborNode);
                        return reconstructPath(neighborNode);
                    }
                }
            }

            return null;
        };

        const reconstructPath = (currentNode) => {
            const path = [currentNode];

            while (currentNode.cameFrom) {
                path.unshift(currentNode.cameFrom);

                currentNode = currentNode.cameFrom;
            }

            return path;
        };

        const calcTileKey = (m, n) => {
            return m + n * 1000;
        };

        return findPath(beginMN, endMN);
    }
}