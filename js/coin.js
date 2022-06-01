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
        this.coinsTouched = 0;
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
            coin.angle = -(i * 0.02)
            coin.dist = hCoins + Math.cos(i*0.5)*amplitude;
            coin.mesh.position.y = Math.sin(coin.angle) * coin.dist;
            coin.mesh.position.x = Math.cos(coin.angle) * coin.dist;
            // coin.mesh.position.z = ; 
            this.coinsInUse.push(coin);

        }
    }
    rotationCoins(){
        for(let i = 0; i < this.coinsInUse.length; i++){
            let coin = this.coinsInUse[i];
            coin.angle += 0.001;
            if(coin.angle > Math.PI){
                this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0]);
                this.mesh.remove(coin.mesh);
                i--;
            }
            coin.mesh.position.y = coin.mesh.position.y = Math.sin(coin.angle) * coin.dist;
            coin.mesh.position.x = Math.cos(coin.angle) * coin.dist;
            coin.mesh.rotation.y += 0.1 + (Math.random() * 2) / 10; 
            
        }

    }

    touchPlane(obj, delta_pos){
        for(let i = 0; i < this.coinsInUse.length; i++){
            let coin = this.coinsInUse[i];
            var diffPos = obj.mesh.position.clone().sub(coin.mesh.position.clone()).sub(delta_pos);
            // console.log('plane:', obj.mesh.position.x, obj.mesh.position.y, obj.mesh.position.z)
            // console.log('coin:',  coin.mesh.position.x, coin.mesh.position.y, coin.mesh.position.z)
            // console.log(diffPos.x, diffPos.y, diffPos.z)
            // console.log(diffPos);
            var d = diffPos.length();
            if(d < 20){
                this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0]);
                this.mesh.remove(coin.mesh);
                i--;
                this.coinsTouched += 1;
                // CỘng điểm
            }

            this.is_touched = false;
            
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
