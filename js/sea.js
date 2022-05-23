import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Mesh,
  BoxGeometry,
  MeshNormalMaterial,
  AxesHelper,
  BoxBufferGeometry,
  Group,
  Object3D,
  CylinderGeometry,
  MeshPhongMaterial,
  Matrix4,
  FlatShading,
} from "https://unpkg.com/three@0.137.5/build/three.module.js";
var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  pink: 0xf5986e,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};
export class Sea {
  constructor() {
    // this.mesh = new Group();
    this.geom = new CylinderGeometry(1600, 600, 800, 40, 10);
    this.geom.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));
    this.mat = new MeshPhongMaterial({
      color: Colors.blue,
      transparent: true,
      opacity: 0.6,
      Flatshading: FlatShading,
    });
    this.mesh = new Mesh(this.geom,this.mat)

    
    // const m = new Mesh(geom, mat);
    //this.sea = this.createSea(this.geom,this.mat)
    //this.mesh.receiveShadow = true;
  };
  // createSea(geom,mat){
  //   const sea = new Mesh(geom,mat)
  //   this.mesh.add(m)
  // }
}