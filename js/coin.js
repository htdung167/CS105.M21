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
    }
    createChainCoin(nCoins){
        let coinsPool = []
        for(let i = 0; i < nCoins; i++){
            let coin = new Coin();
            coinsPool.push(coin);
        }
        let heightSea = 300;
        let heightMaxFly= 300;
        let hCoins = heightSea + Math.floor(Math.random() * (heightMaxFly - heightSea - 100));
        let amplitude = 10 + Math.round(Math.random() * 10);

    }
}

class Coin {
    constructor(){
        this.mesh = new Mesh();
        this.pointGeometry = new TorusGeometry(2, 1, 10, 16);
        this.pointMaterial = new MeshNormalMaterial();
        this.createPoint(this.pointGeometry, this.pointMaterial);
    }
    createPoint(pointGeometry, pointMaterial){
        this.mesh = new Mesh(pointGeometry, pointMaterial);
        this.mesh.castShadow = true;
    }
}
