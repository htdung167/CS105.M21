import {
  TetrahedronGeometry,
  MeshPhongMaterial,
  Mesh,
  Object3D,
  Group,
} from "https://unpkg.com/three@0.137.5/build/three.module.js";

export class Ennemy {
  constructor() {
    this.geom = new TetrahedronGeometry(10, 2);
    this.mat = new MeshPhongMaterial({
      color: 0xa52a2a,
      shininess: 0,
      flatShading: true,
    });
    this.mesh = new Mesh(this.geom, this.mat);
    this.mesh.castShadow = true;
    this.angle = 0;
    this.dist = 0;
  }
  updateRotationZ() {
    this.mesh.rotation.z += 0.1;
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
    for (let i = 0; i < level; i++) {
      console.log("spawn: " + level);
      var ennemy;
      if (this.ennemiesPool.length > 0) {
        ennemy = this.ennemiesPool.pop();
      } else {
        ennemy = new Ennemy();
      }
      this.mesh.add(ennemy.mesh);

      ennemy.angle = -(i * 100);
      ennemy.dist = 1200 + Math.random() * 100;
      ennemy.mesh.position.y = Math.sin(ennemy.angle) * ennemy.dist - Math.random() * 50;
      ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.dist;
      ennemy.mesh.position.z = 0;

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
      ennemy.mesh.rotation.y += 0.01 + (Math.random() * 2) / 10;
    }
  }
}
