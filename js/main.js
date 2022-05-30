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
  // requestAnimationFrame
} from "https://unpkg.com/three@0.137.5/build/three.module.js";

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  pink: 0xf5986e,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};
import { Plane, Pilot } from "./pilot_plane.js";
import { Sky } from "./sky.js";
import { Sea } from "./sea.js ";
import { Light } from "./light.js";
import { Ennemy, EnnemiesHolder } from "./ennemy.js";
import { ChainCoin } from "./coin.js";
var ennemiesPool = [];
class Game {
  constructor(canvas) {
    this.scene = this.createScene();
    this.camera = this.createCamera(canvas);
    this.renderer = this.createRenderer(canvas);
    this.mousePos = { x: 0, y: 0 };
    //Add Cube
    // const cube = this.createCube();
    // this.scene.add(cube);
    this.plane = this.createPlane();
    this.scene.add(this.plane.mesh);
    // Add sky
    this.sky = this.createSky(50);
    this.scene.add(this.sky.mesh);
    // Add sea
    this.sea = this.createSea();
    this.scene.add(this.sea.mesh);
    // Add light
    this.light = this.createLight();
    this.scene.add(this.light.hemisphereLight);
    this.scene.add(this.light.shadowLight);
    // Add ennemy
    this.ennemiesHolder = this.createEnnemy();
    this.scene.add(this.ennemiesHolder.mesh);
    // Add coin test
    this.chaincoins = this.createCoin(500);
    this.scene.add(this.chaincoins.mesh);
    // Resize
    this.handleResize();
    //Render
    this.render(1);
    
    document.addEventListener("mousemove", this.handleMouseMove, false);
    // loop
    this.loop();
  }
  
  // Create Scene
  createScene() {
    const scene = new Scene();
    scene.background = new Color(0xffcc99);
    return scene;
  }
  // Create Camera
  createCamera(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const aspectRatio = width / height;
    const camera = new PerspectiveCamera(60, aspectRatio, 0.1, 10000);
    camera.position.set(0, 200, 2000);
    // camera.position.set(0, 200, 200);

    return camera;
  }

  // Create Renderer
  createRenderer(canvas) {
    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setClearColor(0xffffff);
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio;
    const height = canvas.clientHeight * pixelRatio;
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
  }
  createLight() {
    const light = new Light();
    return light;
  }
  createCube() {
    const cubeGeometry = new BoxGeometry(6, 6, 6);
    const cubeMaterial = new MeshNormalMaterial();
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    return cube;
  }
  //Create Pilot
  createPlane() {
    const plane = new Plane();
    // pilot.updateHairs();
    plane.mesh.scale.set(0.25, 0.25, 0.25);
    plane.mesh.position.y = 200;
    return plane;
  }
  // Create Sky
  createSky(nClouds) {
    const sky = new Sky(nClouds);
    sky.setPosition(0, -1000, -100);
    sky.mesh.tick = (ms) => {
      sky.updateRotationZ(ms);
    };
    console.log("Sky", sky.mesh.position.x, sky.mesh.position.y);
    return sky;
  }

  createSea() {
    const sea = new Sea();
    sea.mesh.position.y = -550;

    sea.mesh.tick = (ms) => {
      sea.mesh.rotation.z += 0.001;
    };
    console.log("Sea", sea.mesh.position.x, sea.mesh.position.y);
    return sea;
  }

  createEnnemy() {
    for (var i = 0; i < 10; i++) {
      const ennemy = new Ennemy();
      ennemiesPool.push(ennemy);
    }
    var nEnnemies = 30; // game level
    const ennemiesHolder = new EnnemiesHolder(ennemiesPool, nEnnemies);
    ennemiesHolder.spawnEnnemies();
    ennemiesHolder.mesh.position.y = -1000;

    ennemiesHolder.mesh.tick = (ms) => {
      ennemiesHolder.mesh.rotation.z += 0.001;
    };
    return ennemiesHolder;
  }

  createCoin() {
    const coinsHolder = new ChainCoin(20);
    coinsHolder.mesh.position.y = -1100;
    coinsHolder.mesh.position.z = -70;
    let i = 0;
    let oldTime = 0;
    let newTime = 0;
    coinsHolder.mesh.tick = (ms) => {
      coinsHolder.rotationCoins();
      newTime = new Date().getTime();
      let deltaTime = newTime - oldTime;
      oldTime = newTime;
      // console.log(deltaTime);
      // console.log(coinsHolder.coinsPool.length)
      let rand = Math.floor(Math.random() * 200);
      // console.log(rand);

      if (rand == 16 || rand == 7) {
        console.log("Pool:", coinsHolder.coinsPool.length);
        console.log("InUse:", coinsHolder.coinsInUse.length);
        coinsHolder.spawnCoins();
      }
    };

    return coinsHolder;

    // const coins = new ChainCoin();
    // coins.mesh.position.y = -1100;
    // coins.mesh.position.z = -70;
    // // console.log(coins.coinsPool)
    // let lstCoin = coins.mesh.children;
    // console.log(lstCoin);
    // coins.mesh.tick = (ms) => {
    //   let lstCoin = coins.mesh.children;
    //   for (let i = 0; i < lstCoin.length; i++) {
    //     lstCoin[i].rotation.y += 0.1 + (Math.random() * 2) / 10;
    //   }
    //   coins.mesh.rotation.z += 0.001;
    // };
    // return coins;
  }
  update(ms) {
    this.sky.mesh.tick(ms);
    this.sea.mesh.tick(ms);
    this.ennemiesHolder.mesh.tick();
    this.chaincoins.mesh.tick(ms);
  }

  render(ms = 10000) {
    this.update(ms);
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
  loop() {
    this.plane.updatePlane(this.mousePos);
    // renderer.render(scene, camera);
    requestAnimationFrame(this.loop);
  }
  handleMouseMove(event) {
    var tx = -1 + (event.clientX / canvas.clientWidth) * 2;
    var ty = 1 - (event.clientY / canvas.clientHeight) * 2;
    mousePos = { x: tx, y: ty };
  }
}
window.addEventListener("load", () => {
  new Game(document.querySelector("#webglOutput"));
});
