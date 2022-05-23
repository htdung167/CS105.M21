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
  Object3D,
  // requestAnimationFrame
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
import {Sea} from './sea.js '

class Game {
  constructor(canvas) {
    this.scene = this.createScene();
    this.camera = this.createCamera(canvas);
    this.renderer = this.createRenderer(canvas);

    //Add Cube
    const cube = this.createCube();
    this.scene.add(cube);
    // Add sky
    this.sky = this.createSky(200);
    this.scene.add(this.sky.mesh);
    // Resize
    this.handleResize();
    //Render
    this.render();
    // loop
    // this.loop();
  }

  // Create Scene
  createScene() {
    const scene = new Scene();
    // scene.background = new Color(0xffffff);
    return scene;
  }

  // Create Camera
  createCamera(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const aspectRatio = width / height;
    const camera = new PerspectiveCamera(60, aspectRatio, 0.1, 1000);
    camera.position.set(0, 200, 100);
    return camera;
  }

  // Create Renderer
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

  // Create Sky
  createSky(nClouds) {
    const sky = new Sky(nClouds);
    sky.setPosition(0, -1200, 0);
    sky.mesh.tick = (ms) => {
      sky.updateRotationZ();
    }
    return sky;
  }

    createSea() {
    const sea = new Sea();
    sea.mesh.position.y = -600
    return sea;



  update(){
    this.sky.mesh.tick();
  }

  render(ms=0) {
    this.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  // loop() {
  //   this.sky.mesh.rotation.z += 1;
    
  //   this.render();
  //   requestAnimationFrame(this.loop);
  // }

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
}


}

window.addEventListener('load', () => { 
    new Game(document.querySelector('#webglOutput'));
});

