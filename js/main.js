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

import {Sky} from './sky.js'

class Game {
  constructor(canvas) {
    this.scene = this.createScene();
    this.camera = this.createCamera(canvas);
    this.renderer = this.createRenderer(canvas);
    const axesHelper = new AxesHelper(15);
    this.scene.add(axesHelper);

    const cube = this.createCube();
    this.scene.add(cube);
    
    // Add sky
    this.sky = this.createSky();
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
    const camera = new PerspectiveCamera(60, aspectRatio, 0.1, 1000);
    camera.position.set(0, 200, 100);
    // camera.lookAt(this.scene.position);
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
    sky.setPosition(0, -600, 0);
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




window.addEventListener('load', () => { 
    new Game(document.querySelector('#webglOutput'));
});

