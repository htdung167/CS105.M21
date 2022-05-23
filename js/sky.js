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

// Class Cloud
export class Cloud {
    constructor(){
      // Tạo Group rỗng
      this.mesh = new Group();
  
      // Tạo cloud geometry
      this.cloudGeometry = new BoxBufferGeometry(10, 10, 10);
  
      // Tạo cloud material
      // this.cloudMaterial = new MeshPhongMaterial({color : Colors.white});
      this.cloudMaterial = new MeshNormalMaterial();
  
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
        let s = 0.1 + Math.random() * 0.9;
        m.scale.set(s, s, s);
  
        // Đổ bóng
        // m.castShadow = true;
        // m.receiveShadow = true;
  
        // Thêm cube vào group
        this.mesh.add(m);
      }
    }
  
  }
  
// Class Sky
export class Sky {
  constructor(){
    this.mesh = new Group();
    this.nClouds = 30; // Số lượng mây

    // Rải các đám mây trên trời theo góc bằng nhau
    this.stepAngle = Math.PI * 2 / this.nClouds; 
    this.createClouds(this.nClouds);  
  }

  createClouds(nClouds){
    for(let i = 0; i < nClouds; i++){
      let cloud = new Cloud();
      
      let a = this.stepAngle * i;
      let h = 700 + Math.random() * 200; // Khoảng cách từ tâm tới đám mây

      // Vị trí đám mây
      cloud.mesh.position.x = Math.cos(a) * h;
      cloud.mesh.position.y = Math.sin(a) * h;

      // Xoay đám mây theo trục z của nớ
      cloud.mesh.rotation.z = a + Math.PI / 2;  

      // Set độ sâu của đám mây
      let s = 1 + Math.random() * 2;
      cloud.mesh.scale.set(s, s, s);
      this.mesh.add(cloud.mesh);
    }
  }
}


  