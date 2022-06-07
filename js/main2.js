  
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Fog,
  Vector3,
  Mesh,
  BoxGeometry,
  MeshNormalMaterial,
  AxesHelper,
  MeshPhongMaterial,
  BoxBufferGeometry,
  Group,
  AudioLoader,
  AudioListener,
  Audio,
  CameraHelper,
  Matrix4,  
  // requestAnimationFrame
} from "https://unpkg.com/three@0.137.5/build/three.module.js";
  
  import { Plane } from "./pilot_plane.js";
  import { Sky, Cloud } from "./sky.js";
  import { Sea } from "./sea.js ";
  import { Light } from "./light.js";
  import { Ennemy, EnnemiesHolder } from "./ennemy.js";
  import { ChainCoin } from "./coin.js";
  // import { ParticlesHolder, Particle } from "./particles.js";
  var ennemiesPool = [];
  var Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    pink: 0xf5986e,
    brown: 0x59332e,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
  };
  
  class Game {
    constructor(canvas) {
      //
      this.flagBrightness = true;
      this.width = canvas.clientWidth;
      this.height = canvas.clientHeight;
      this.scene = this.createScene();
      this.camera = this.createCamera(canvas);
      this.renderer = this.createRenderer(canvas);
  
      this.plane = this.createPlane(canvas);
      // this.scene.add(this.plane.mesh);
      // Add sky
      // this.sky = this.createSky(100);
      // this.scene.add(this.sky.mesh.children[50]);
      this.cloud = this.createCloud();
      // this.scene.add(this.cloud.mesh);
      // Add sea
      this.sea = this.createSea();
      // this.scene.add(this.sea.mesh);

    //   // Add light
      this.light = this.createLight();
      this.scene.add(this.light.hemisphereLight);
      this.scene.add(this.light.shadowLight);
    //   // Add ennemy
    //   this.ennemiesHolder = this.createEnnemy(50);
    //   this.scene.add(this.ennemiesHolder.mesh);
    this.aEnnemy = this.createAEnnemy(5);
    // this.scene.add(this.aEnnemy.mesh);
    //   // Add coin test
      // this.chaincoins = this.createCoin(500);
      // this.scene.add(this.chaincoins.mesh);
      this.aCoin = this.createACoin();
      this.scene.add(this.aCoin.mesh);

      this.handleResize();
      //Render
      this.render(1);
  
    }
  
    // Create Scene
    createScene() {
      const scene = new Scene();
      scene.background = new Color(0xffcc99);
      // scene.fog = new Fog(0xf7d9aa, 100, 950);
      return scene;
    }
  
    // Create Camera
    createCamera(canvas) {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const aspectRatio = width / height;
      const camera = new PerspectiveCamera(60, aspectRatio, 0.1, 10000);
      camera.position.set(0, 205, 180);
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
  
      renderer.shadowMap.enabled = true; 
      return renderer;
    }
  
    createLight() {
      const light = new Light();
      return light;
    }
    
    //Create Plane
    createPlane(canvas) {
      const plane = new Plane();
      let mousePos = { x: 0, y: 0 };
      // pilot.updateHairs();
      plane.mesh.scale.set(0.25, 0.25, 0.25);
      plane.mesh.position.y = 200;
      plane.mesh.position.x = 0;
      plane.mesh.position.z = -100;
      plane.mesh.applyMatrix(new Matrix4().makeRotationY(-Math.PI));
  
    //   document.addEventListener("mousemove", (event) => {
    //     const width = canvas.clientWidth;
    //     const height = canvas.clientHeight;
    //     var tx = -1 + (event.clientX / width) * 2;
    //     var ty = 1 - (event.clientY / height) * 2;
    //     mousePos = { x: tx, y: ty };
    //     this.plane.updatePlane(mousePos);
    //   });
  
      plane.mesh.tick = () => {
        plane.mesh.rotation.y += 0.01;
        // plane.animatePlane();
      };
      return plane;
    }
  
    // Create Sky
    createSky(nClouds) {
      const sky = new Sky(nClouds);
      sky.setPosition(0, -1050, -100);
      sky.mesh.tick = () => {
        sky.updateRotation(this.speed);
      };
      sky.mesh.castShadow = true;
      return sky;
    }

    createCloud(){
      const cloud = new Cloud();
      cloud.setPosition(0, 250, 0);
      cloud.mesh.tick = () => {
        cloud.updateRotation();
        // cloud.mesh.rotation.y += 0.1;
      }
      return cloud;

    }

    createSea() {
      const sea = new Sea();
      sea.mesh.position.y = -550;
      sea.mesh.tick = (ms) => {
        sea.mesh.rotation.z += 0.01;
      };
      return sea;
    }

    createEnnemy(nEnnemies) {
      // var nEnnemies = 50; // game level
      const ennemiesHolder = new EnnemiesHolder(nEnnemies);
      
      let delta_x = 0;
      let delta_y = -1000;
      let delta_z = -70;
      let delta_pos = new Vector3(delta_x, delta_y, delta_z);
      ennemiesHolder.mesh.position.x = delta_x;
      ennemiesHolder.mesh.position.y = delta_y;
      ennemiesHolder.mesh.position.z = delta_z;
  
      ennemiesHolder.mesh.tick = (ms) => {
        // ennemiesHolder.mesh.rotation.z += 0.001;
        ennemiesHolder.RotationEnnemy(this.speed);
        ennemiesHolder.touchPlane(this.plane, delta_pos);
        let rand = Math.floor(Math.random() * 250);
        // console.log(rand);
  
        if (rand == 2 || rand == 86) {
           ennemiesHolder.spawnEnnemies(this.level);
        }
      };
      return ennemiesHolder;
    }

    createAEnnemy(nEnnemies){
      const ennemiesHolder = new EnnemiesHolder();
      ennemiesHolder.mesh.position.x = 0;
      ennemiesHolder.mesh.position.y = -1000;
      ennemiesHolder.mesh.position.z = -70;
      ennemiesHolder.spawnEnnemies(nEnnemies);
      for (let i = 0; i < ennemiesHolder.ennemiesInUse.length; i++) {
        let ennemy = ennemiesHolder.ennemiesInUse[i];
        ennemy.angle += 0.7;
      }

      ennemiesHolder.mesh.tick = (ms) => {
        for (let i = 0; i < ennemiesHolder.ennemiesInUse.length; i++) {
          let ennemy = ennemiesHolder.ennemiesInUse[i];
          ennemy.mesh.position.y = Math.sin(ennemy.angle) * ennemy.dist;
          ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.dist;
          ennemy.mesh.rotation.x += 0.01 + (Math.random() * 2) / 10;
        }
      };
      return ennemiesHolder;
    }

    createCoin() {
      const coinsHolder = new ChainCoin(20);
      let delta_x = 0;
      let delta_y = -1100;
      let delta_z = -70;
      coinsHolder.mesh.position.x = delta_x;
      coinsHolder.mesh.position.y = delta_y;
      coinsHolder.mesh.position.z = delta_z;
      
      coinsHolder.mesh.tick = (ms) => {
        coinsHolder.rotationCoins(this.speed);
        // coinsHolder.touchPlane(this.plane, delta_pos);
        let rand = Math.floor(Math.random() * 100);
        if (rand == 16 || rand == 7) {
          coinsHolder.spawnCoins();
        }
      };
      return coinsHolder;
    }

    createACoin(){
      const coinsHolder = new ChainCoin(20);
      coinsHolder.mesh.position.x = 0;
      coinsHolder.mesh.position.y = -1100;
      coinsHolder.mesh.position.z = -70;
      coinsHolder.spawnCoins();
      let s = 1;
      coinsHolder.mesh.scale.set(s, s, s);

      for(let i = 0; i < coinsHolder.coinsInUse.length; i++){
        let coin = coinsHolder.coinsInUse[i];
        coin.angle += 1.7; 
      }

      coinsHolder.mesh.tick = (ms) => {
        for(let i = 0; i < coinsHolder.coinsInUse.length; i++){
          let coin = coinsHolder.coinsInUse[i];
          coin.mesh.position.y = Math.sin(coin.angle) * coin.dist;
          coin.mesh.position.x = Math.cos(coin.angle) * coin.dist;
          coin.mesh.rotation.y += 0.1 ; 
      }

      };
      return coinsHolder;
    }

    // Hàm check nếu game over set lại các tham số
    update(ms) {
    //   this.sky.mesh.tick();
    //   this.sea.mesh.tick();
    //   this.ennemiesHolder.mesh.tick();
      // this.chaincoins.mesh.tick();
      if(this.hasOwnProperty("plane")){
        this.plane.mesh.tick();
      }
      if(this.hasOwnProperty("cloud"))
      {
        this.cloud.mesh.tick();
      }
      if(this.hasOwnProperty("aCoin"))
      {
        this.aCoin.mesh.tick();
      }
      if(this.hasOwnProperty("aEnnemy")){
        this.aEnnemy.mesh.tick();
      }
      if(this.hasOwnProperty("sea")){
        this.sea.mesh.tick();
      }
    }
  
    render(ms = 10000) {
      this.update(ms);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render.bind(this));
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
  }
    
  
  window.addEventListener("load", () => {
    new Game(document.querySelector("#webglOutput"));
  });