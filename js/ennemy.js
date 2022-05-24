import { 
    TetrahedronGeometry,
    MeshPhongMaterial,
    Mesh,
    Group,
} from "https://unpkg.com/three@0.137.5/build/three.module.js";
export class Stone{
    constructor() {
        this.geom = new TetrahedronGeometry(10, 2);
        this.mat = new MeshPhongMaterial({
          color: 0xa52a2a,
          shininess: 0,
          flatShading: true,
        });
        this.createStone(this.geom, this.mat);      
    }
    createStone(geom, mat) {
        //create stones
          this.mesh = new Group();
          let m = new Mesh(geom, mat);
          m.position.x = 0;
          m.position.y = Math.random() * 10;
          m.position.z = Math.random() * 10;
          m.rotation.z = Math.random() * Math.PI * 2;
          m.rotation.y =  Math.random() * Math.PI * 2;
          let s = 0.1 + Math.random() * 0.9;
          m.scale.set(s, s, s);
          m.castShadow = true;
          m.receiveShadow = true;
          this.mesh.add(m);
        }
    
    setPosition(x, y, z){
      this.mesh.position.x = x;
      this.mesh.position.y = y;
      this.mesh.position.z = z;
    }
  }
export class Ennemy {
    constructor(nEnnemys) {
        this.nEnnemys = nEnnemys;
        this.mesh = new Group();
        this.stepAngle = (Math.PI * 2) / this.nEnnemys; 
        this.createEnnemy(this.nEnnemys);
    }
    createEnnemy(nEnnemys) {
        //create ennemies
        for (let i = 0; i < nEnnemys; i++) {
          let stone = new Stone();
          let a = this.stepAngle * i;
          let h = 1200 + Math.random() * 100; // Khoảng cách từ tâm tới đám mây
          // Vị trí đám mây
          stone.setPosition(
            Math.cos(a) * h,
            Math.sin(a) * h + 100,
            -400 - Math.random() * 400
          );
          let s = 0.5 + Math.random() * 2;
          stone.mesh.scale.set(s, s, s);
          this.mesh.add(stone.mesh);
        }
    }
    setPosition(x, y, z){
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
    }
}