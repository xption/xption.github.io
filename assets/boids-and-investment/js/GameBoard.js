export class GameBoard {
    boidScene = null;
    
    static instance = null;

    // 静态方法获取单例实例
    static getInstance() {
        if (!GameBoard.instance) {
            GameBoard.instance = new GameBoard();
        }
    
        return GameBoard.instance;
    }

    // 私有构造函数
    constructor() {
        if (GameBoard.instance) {
            throw new Error("Cannot create multiple instances of GameBoard. Use getInstance() instead.");
        }
    }
}