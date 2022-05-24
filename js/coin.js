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

export class ChainCoin {
    constructor(){
        this.mesh = new Group();
        this.nCoins = 1 + Math.floor(Math.random() * 10);
        // this.nCoins = 1;
        // this.createChainCoin(this.nCoins);
        // this.coinsPool = this.createChainCoin(this.nCoins);
        this.coinsPool = new Array();
        this.createChainCoin(this.nCoins);
        this.coinsInUse = [];
    }
    createChainCoin(nCoins){
        for(let i = 0; i < nCoins; i++){
            let coin = new Coin();
            this.coinsPool.push(coin);
        }
        let heightSea = 1200;
        // let heightMaxFly= 1600;
        let hCoins = heightSea + 100  + 50 * Math.random(); // 1200 - 1300
        // let hCoins = 1320;
        // console.log(hCoins);
        let amplitude = 10 + Math.round(Math.random() * 10);
        for(let i = 0; i < nCoins; i++){
            let coin = new Coin();
            this.mesh.add(coin.mesh);
            // coinsPool.push(coin.mesh);
            coin.dist = hCoins + Math.cos(i*0.5)*amplitude; //1265 - 1340
            // coin.dist = 1340;
            // console.log(coin.dist);
            // coin.angle = -0.02 * i;
            coin.angle = Math.PI / 2 - 0.005 * i;
            // coin.mesh.position.y = - heightSea + Math.sin(coin.angle) * coin.dist;
            coin.mesh.position.y = Math.sin(coin.angle) * coin.dist;
            // coin.mesh.position.x = Math.cos(coin.angle) * coin.dist; 
            coin.mesh.position.x = Math.cos(coin.angle) * coin.dist; 
            coin.castShadow = true;
            coin.receiveShadow = true;

        }
    }
    
}

class Coin {
    constructor(){
        this.mesh = new Mesh();
        this.pointGeometry = new TorusGeometry(2, 1, 5, 8);
        // this.pointGeometry = new TorusGeometry(100, 50, 5, 8);

        this.pointMaterial = new MeshPhongMaterial({
            color: new Color(0xFFFF00),
            transparent: true,
          });
        this.createPoint(this.pointGeometry, this.pointMaterial);
        this.angle = 0;
        this.dist = 0;
    }
    createPoint(pointGeometry, pointMaterial){
        this.mesh = new Mesh(pointGeometry, pointMaterial);
        this.mesh.castShadow = true;
    }
    updateRotationZ(){
        this.mesh.rotation.z += 0.01;
    }
    // tick(ms){
    //     this.mesh.tick(ms) = () => {
    //         this.mesh.rotation.z += 0.01;
    //     }
    // }
}
