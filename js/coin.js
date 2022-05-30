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
    constructor(nCoins){
        this.mesh = new Group();
        this.coinsInUse = [];
        this.coinsPool = [];
        for(let i = 0; i < nCoins; i++)
        {
            let coin = new Coin();
            this.coinsPool.push(coin);
        }


        // this.nCoins = 1 + Math.floor(Math.random() * 10);
        // this.createChainCoin(this.nCoins);
    }

    spawnCoins(){
        let nCoins = 1 + Math.floor(Math.random() * 10);
        let heightSea = 1200;
        let hCoins = heightSea + 100  + 50 * Math.random(); // 1200 - 1300
        let amplitude = 10 + Math.round(Math.random() * 10);
        for(let i = 0; i < nCoins; i++){
            var coin;
            if(this.coinsPool.length){
                coin = this.coinsPool.pop();
            }else{
                coin = new Coin();
            }
            this.mesh.add(coin.mesh);
            this.coinsInUse.push(coin);
            coin.angle = -(i * 0.02)
            coin.dist = hCoins + Math.cos(i*0.5)*amplitude;
            coin.mesh.position.y = Math.sin(coin.angle) * coin.dist;
            coin.mesh.position.x = Math.cos(coin.angle) * coin.dist; 
        }

        // for(let i = 0; i < nCoins; i++){
        //     let coin = new Coin();
        //     this.coinsPool.push(coin);
        // }
        // // let heightMaxFly= 1600;
        // // let hCoins = 1320;
        // // console.log(hCoins);
        // for(let i = 0; i < nCoins; i++){
        //     let coin = new Coin();
        //     this.mesh.add(coin.mesh);
        //     // coinsPool.push(coin.mesh);
        //     coin.dist = hCoins + Math.cos(i*0.5)*amplitude; //1265 - 1340
        //     // coin.dist = 1340;
        //     // console.log(coin.dist);
        //     // coin.angle = -0.02 * i;
        //     coin.angle = Math.PI / 2 - 0.005 * i;
        //     // coin.mesh.position.y = - heightSea + Math.sin(coin.angle) * coin.dist;
        //     coin.mesh.position.y = Math.sin(coin.angle) * coin.dist;
        //     // coin.mesh.position.x = Math.cos(coin.angle) * coin.dist; 
        //     coin.mesh.position.x = Math.cos(coin.angle) * coin.dist; 
        //     coin.castShadow = true;
        //     coin.receiveShadow = true;

        // }
    }
    rotationCoins(){
        for(let i = 0; i < this.coinsInUse.length; i++){
            let coin = this.coinsInUse[i];
            coin.angle += 0.001;
            if(coin.angle > Math.PI * 2){
                coin.angle -= Math.PI * 2;
            }
            coin.mesh.position.y = coin.mesh.position.y = Math.sin(coin.angle) * coin.dist;
            coin.mesh.position.x = Math.cos(coin.angle) * coin.dist;
            coin.mesh.rotation.y += 0.1 + (Math.random() * 2) / 10; 
        }
    }
    
}

class Coin {
    constructor(){
        this.mesh = new Mesh();
        this.coinGeometry = new TorusGeometry(2, 1, 5, 8);
        this.coinMaterial = new MeshPhongMaterial({
            color: new Color(0xFFFF00),
            transparent: true,
          });
        this.createCoin(this.coinGeometry, this.coinMaterial);
        this.angle = 0;
        this.dist = 0;
    }
    createCoin(coinGeometry, coinMaterial){
        this.mesh = new Mesh(coinGeometry, coinMaterial);
        this.mesh.castShadow = true;
    }
}
