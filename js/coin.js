import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Color,
    Mesh,
    BoxGeometry,
    MeshNormalMaterial,
    AxesHelper,
    MeshPhongMaterial,
    BoxBufferGeometry,
    Group,
    TorusGeometry
  } from "https://unpkg.com/three@0.137.5/build/three.module.js";

class CoinChain {
    constructor(){
        this.mesh = new Group();
        this.nCoins = 1 + Math.floor(Math.random() * 10);
        this.createChainCoin(this.nCoins);
        this.coinsPool = [];
        this.coinsInUse = [];
    }
    createChainCoin(nCoins){
        let coinsPool = []
        for(let i = 0; i < nCoins; i++){
            let coin = new Coin();
            this.coinsPool.push(coin);
        }
        let heightSea = 1100;
        let heightMaxFly= 1600;
        let hCoins = heightSea + 100 + Math.floor(Math.random() * (heightMaxFly - heightSea - 100));
        let amplitude = 10 + Math.round(Math.random() * 10);

    }
}

class Coin {
    constructor(){
        this.mesh = new Mesh();
        this.pointGeometry = new TorusGeometry(2, 1, 10, 16);
        this.pointMaterial = new MeshNormalMaterial();
        this.createPoint(this.pointGeometry, this.pointMaterial);
        this.angle = 0;
        this.dist = 0;
    }
    createPoint(pointGeometry, pointMaterial){
        this.mesh = new Mesh(pointGeometry, pointMaterial);
        this.mesh.castShadow = true;
    }
}
