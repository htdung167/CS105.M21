import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Mesh,
  BoxGeometry,
  MeshNormalMaterial,
  AxesHelper
} from "https://unpkg.com/three@0.137.5/build/three.module.js";
class Game {
  constructor(canvas) {
    this.scene = this.createScene();
    this.camera = this.createCamera(canvas);
    this.renderer = this.createRenderer(canvas);
    // const axesHelper = new AxesHelper(15);
    const cube = this.createCube();
    this.scene.add(cube);
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

