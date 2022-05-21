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
  red:0xf25346,
  white:0xd8d0d1,
  pink:0xF5986E,
  brown:0x59332e,
  brownDark:0x23190f,
  blue:0x68c3c0,
}

class Game {
  constructor(canvas) {
    this.scene = this.createScene();
    this.camera = this.createCamera(canvas);
    this.renderer = this.createRenderer(canvas);
    // const axesHelper = new AxesHelper(15);
    const cube = this.createCube();
    this.scene.add(cube);
    console.log(1);
    
    // Add sky
    this.sky = this.createSky();
    console.log(2);
    this.scene.add(this.sky);
    console.log(3);



    this.handleResize();
    this.render();
  }
  createScene() {
    const scene = new Scene();
    // scene.background = new Color(0xffffff);
    return scene;
  }
  createCamera(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const aspectRatio = width / height;
    const camera = new PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    camera.position.set(-30, 40, 35);
    camera.lookAt(this.scene.position);
    return camera;
  }

  createRenderer(canvas) {
    const renderer = new WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setClearColor(0xffffff);
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio;
    const height = canvas.clientHeight * pixelRatio;
    renderer.setSize(width, height, false);
    // renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
  }

  createCube() {
    const cubeGeometry = new BoxGeometry(6, 6, 6);
    const cubeMaterial = new MeshNormalMaterial();
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    return cube;
  }

  // Tạo Sky
  createSky() {
    const sky = new Sky();
    // sky.mesh.position.x = 0;
    sky.mesh.position.y = 0;
    // sky.mesh.position.z = 0;
    return sky.mesh;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
  handleResize() {
    window.addEventListener("resize", () => {
      this.onResize();
      this.render();
    });
  }

  onResize() {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio;
    const height = canvas.clientHeight * pixelRatio;
    const aspectRatio = width / height;
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }
//   update() {}
}





// Class Sky
class Sky {
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



// Class Cloud
class Cloud {
  constructor(){
    // Tạo Group rỗng
    this.mesh = new Group();

    // Tạo cloud geometry
    this.cloudGeometry = new BoxBufferGeometry(20, 20, 20);

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
      m.position.x = i * 15;
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




window.addEventListener('load', () => { 
    new Game(document.querySelector('#webglOutput'));
});

