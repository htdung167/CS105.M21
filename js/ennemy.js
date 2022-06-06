import {
  TetrahedronGeometry,
  MeshPhongMaterial,
  CylinderGeometry,
  Mesh,
  Object3D,
  Group,
  Matrix4,
  Color,
} from "https://unpkg.com/three@0.137.5/build/three.module.js";

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  pink: 0xf5986e,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};
export class Ennemy {
  constructor() {
    this.Colors = {
      red: 0xf25346,
      white: 0xd8d0d1,
      pink: 0xf5986e,
      brown: 0x59332e,
      brownDark: 0x23190f,
      blue: 0x68c3c0,
    };
    this.key =  Math.floor(Math.random() * 5),
    console.log("key", this.key);
    this.geom = new CylinderGeometry(0, Math.random()*2 + 4, Math.random()*2 + 15, 15, 1, false);
    // this.geom.applyMatrix4(new Matrix4().makeRotationX(-2*Math.PI));
    this.mat = new MeshPhongMaterial({
      color: new Color(this.Colors[Object.keys(this.Colors)[this.key]]),
      shininess: 0,
      flatShading: true,
    });
    this.mesh = new Mesh(this.geom, this.mat);
    this.mesh.rotation.z = Math.PI / 2;
    this.mesh.castShadow = true;
    this.angle = 0;
    this.dist = 0;
  }
  updateRotationZ() {
    this.mesh.rotation.x += 0.1;
  }
}
export class EnnemiesHolder {
  constructor(nEnnemies) {
    this.mesh = new Group();
    this.ennemiesInUse = [];
    this.ennemiesPool = [];
    this.nEnnemies = nEnnemies;
    this.ennemiesTouched = false;

    for (let i = 0; i < this.nEnnemies; i++) {
      let ennemy = new Ennemy();
      this.ennemiesPool.push(ennemy);
    }
  }
  spawnEnnemies(level) {
    console.log("spawnEnnemies: " + level);
    let hSea = 1160;
    let amplitude = 80;
    for (let i = 0; i < level; i++) {
      var ennemy;
      if (this.ennemiesPool.length > 0) {
        ennemy = this.ennemiesPool.pop();
      } else {
        ennemy = new Ennemy();
      }
      this.mesh.add(ennemy.mesh);

      ennemy.angle = 1 - (i * 0.1);
      ennemy.dist = hSea + ( Math.random() * 2) * (amplitude-20);
      ennemy.mesh.position.y =  100 + Math.sin(ennemy.angle) * ennemy.dist ;
      console.log("pos y: " + ennemy.mesh.position.y);
      ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.dist;
      // ennemy.mesh.position.z = -70;
      // if (ennemy.mesh.position.y > 45) {
      //   ennemy.mesh.position.y = 45;
      // }
      this.mesh.add(ennemy.mesh);
      this.ennemiesInUse.push(ennemy);
    }
  }
  touchPlane(obj, delta_pos) {
    for (let i = 0; i < this.ennemiesInUse.length; i++) {
      let ennemy = this.ennemiesInUse[i];
      var diffPos = obj.mesh.position
        .clone()
        .sub(ennemy.mesh.position.clone())
        .sub(delta_pos.clone());
      // console.log('plane:', obj.mesh.position.x, obj.mesh.position.y, obj.mesh.position.z)
      // console.log('coin:',  coin.mesh.position.x, coin.mesh.position.y, coin.mesh.position.z)
      // console.log(diffPos.x, diffPos.y, diffPos.z)
      // console.log(diffPos);
      var d = diffPos.length();
      if (d < 20) {
        console.log("touched");
        this.ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
        this.mesh.remove(ennemy.mesh);
        i--;
        this.ennemiesTouched = true;
        // this.ennemiesTouched += 1;
        // trừ 1 điểm
      }

      // this.is_touched = false;
    }
  }
  RotationEnnemy(speed) {
    for (let i = 0; i < this.ennemiesInUse.length; i++) {
      let ennemy = this.ennemiesInUse[i];
      ennemy.angle += speed;
      if (ennemy.angle > Math.PI) {
        this.ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
        this.mesh.remove(ennemy.mesh);
        i--;
      }
      ennemy.mesh.position.y = Math.sin(ennemy.angle) * ennemy.dist;
      ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.dist;
      ennemy.mesh.rotation.x += 0.01 + (Math.random() * 2) / 10;
    }
  }
}
