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
  Object3D
} from "https://unpkg.com/three@0.137.5/build/three.module.js";
var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  pink: 0xf5986e,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};
// Class Cloud
export class Cloud {
    constructor(){
      // Tạo Group rỗng
      this.mesh = new Group();
      this.listUse = [];
      // Tạo cloud geometry
      this.cloudGeometry = new BoxBufferGeometry(20, 20, 20);
      // Tạo cloud material
      // this.cloudMaterial = new MeshPhongMaterial({color : Colors.white});
      this.cloudMaterial = new MeshPhongMaterial({
        color: new Color(0xcFFFFF),
        transparent: true,
      });
      // Số cube trong 1 đám mây
      this.nBlocs = 3 + Math.floor(Math.random() * 3); //3 -> 5 đám mây
      this.createCloud(this.cloudGeometry, this.cloudMaterial, this.nBlocs);
    }
  
    createCloud(cloudGeometry, cloudMaterial, nBlocs) {
      // Tạo đám mây
      for(let i = 0; i < nBlocs; i++){
        let m = new Mesh(cloudGeometry, cloudMaterial);
        //Set vị trí và xoay cho mỗi cube
        m.position.x = i * 20;
        m.position.y = Math.random() * 10;  
        m.position.z = Math.random() * 10;
        m.rotation.z = Math.random() * Math.PI * 2;
        m.rotation.y =  Math.random() * Math.PI * 2;
  
        //Set size cho cube
        let s = 0.1 + Math.random() * 1.7;
        m.scale.set(s, s, s);
  
        // Đổ bóng
        m.castShadow = true;
        m.receiveShadow = true;
  
        // Thêm cube vào group
        this.mesh.add(m);
        this.listUse.push(m);
      }
    }

    setPosition(x, y, z){
      this.mesh.position.x = x;
      this.mesh.position.y = y;
      this.mesh.position.z = z;
    }

    updateRotation(){
      for(let i = 0; i < this.listUse.length; i++){
        let aCloud = this.listUse[i];
        aCloud.rotation.x += Math.random()*0.03;
        // aCloud.rotation.y += 0.01;
        aCloud.rotation.z += Math.random()*0.03;

      }
    }
  }
  
// Class Sky
export class Sky {
  constructor(nClouds){
    this.mesh = new Group();
    this.nClouds = nClouds; // Số lượng mây
    this.listUse = [];

    // Rải các đám mây trên trời theo góc bằng nhau
    this.stepAngle = Math.PI * 2 / this.nClouds; 
    this.createClouds(this.nClouds);  
  }

  createClouds(nClouds){
    for(let i = 0; i < nClouds; i++){
      let cloud = new Cloud();
      let a = this.stepAngle * i;
      let h = 1600 + Math.random() * 100; // Khoảng cách từ tâm tới đám mây
      // Vị trí đám mây
      cloud.setPosition(Math.cos(a) * h, Math.sin(a) * h + 100, - 400 - Math.random() * 400)

      // Xoay đám mây hướng vào trục z
      cloud.mesh.rotation.z = a + Math.PI / 2;  
      // Set độ sâu của đám mây
      let s = 0.5 + Math.random() * 2;
      cloud.mesh.scale.set(s, s, s);
      this.mesh.add(cloud.mesh);
      this.listUse.push(cloud);
    }
  }


  setPosition(x, y, z){
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }

  updateRotation(speed){
    this.mesh.rotation.z += speed ;
    for(let i = 0; i < this.listUse.length; i++){
      let clouds = this.listUse[i];
      clouds.updateRotation();
    }
  }
}


  