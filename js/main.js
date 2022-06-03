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
  // requestAnimationFrame
} from "https://unpkg.com/three@0.137.5/build/three.module.js";

import { Plane } from "./pilot_plane.js";
import { Sky } from "./sky.js";
import { Sea } from "./sea.js ";
import { Light } from "./light.js";
import { Ennemy, EnnemiesHolder } from "./ennemy.js";
import { ChainCoin } from "./coin.js";
import { ParticlesHolder, Particle } from "./particles.js";
// var ennemiesPool = [];
var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  pink: 0xf5986e,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

var game = {
      speed: 0,
      initSpeed: 0.00035,
      baseSpeed: 0.00035,
      targetBaseSpeed: 0.00035,
      incrementSpeedByTime: 0.0000025,
      incrementSpeedByLevel: 0.000005,
      distanceForSpeedUpdate: 100,
      speedLastUpdate: 0,

      distance: 0,
      ratioSpeedDistance: 50,
      energy: 100,
      ratioSpeedEnergy: 3,

      level: 1,
      levelLastUpdate: 0,
      distanceForLevelUpdate: 1000,

      planeDefaultHeight: 100,
      planeAmpHeight: 80,
      planeAmpWidth: 75,
      planeMoveSensivity: 0.005,
      planeRotXSensivity: 0.0008,
      planeRotZSensivity: 0.0004,
      planeFallSpeed: 0.001,
      planeMinSpeed: 1.2,
      planeMaxSpeed: 1.6,
      planeSpeed: 0,
      planeCollisionDisplacementX: 0,
      planeCollisionSpeedX: 0,

      planeCollisionDisplacementY: 0,
      planeCollisionSpeedY: 0,

      seaRadius: 600,
      seaLength: 800,
      //seaRotationSpeed:0.006,
      wavesMinAmp: 5,
      wavesMaxAmp: 20,
      wavesMinSpeed: 0.001,
      wavesMaxSpeed: 0.003,

      cameraFarPos: 500,
      cameraNearPos: 150,
      cameraSensivity: 0.002,

      coinDistanceTolerance: 15,
      coinValue: 3,
      coinsSpeed: 0.5,
      coinLastSpawn: 0,
      distanceForCoinsSpawn: 100,

      ennemyDistanceTolerance: 10,
      ennemyValue: 10,
      ennemiesSpeed: 0.6,
      ennemyLastSpawn: 0,
      distanceForEnnemiesSpawn: 50,

      status: "playing",
};


class Game {
  constructor(canvas) {
    //
    // speed
    this.backgroundColor = 0xffcc99;
    this.flagBright = true ;
    this.speed = 0.002;
    this.increaseSpeed = 0.001;
    this.countLoop = 0;
    this.level = 1;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.scene = this.createScene();
    this.camera = this.createCamera(canvas);
    this.renderer = this.createRenderer(canvas);

    this.plane = this.createPlane(canvas);
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

    this.score = document.getElementById("score");
    this.can = document.getElementById("webglOutput");
    // Add particles
    // this.particlesHolder = this.createParticles(50);
    // this.scene.add(this.particlesHolder.mesh);
    // console.log(this.plane.updatePlane())
    // loop
    // this.loop();
    // Resize
    // this.checkCollisions();
    this.handleResize();
    //Render
    this.render(1);
  }

  // Create Scene
  createScene() {
    const scene = new Scene();
    scene.background = this.backgroundColor;
    scene.fog = new Fog(0xf7d9aa, 100, 950);
    return scene;
  }

  // Create Camera
  createCamera(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const aspectRatio = width / height;
    const camera = new PerspectiveCamera(60, aspectRatio, 0.1, 10000);
    camera.position.set(0, 200, 150);
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

  // createCube() {
  //   const cubeGeometry = new BoxGeometry(6, 6, 6);
  //   const cubeMaterial = new MeshNormalMaterial();
  //   const cube = new Mesh(cubeGeometry, cubeMaterial);
  //   cube.position.set(-4, 3, 0);
  //   return cube;
  // }

  //Create Plane
  createPlane(canvas) {
    const plane = new Plane();
    let mousePos = { x: 0, y: 0 };
    // pilot.updateHairs();
    plane.mesh.scale.set(0.25, 0.25, 0.25);
    plane.mesh.position.y = 0;
    plane.mesh.position.x = 0;
    plane.mesh.position.z = -70;

    document.addEventListener("mousemove", (event) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      var tx = -1 + (event.clientX / width) * 2;
      var ty = 1 - (event.clientY / height) * 2;

      mousePos = { x: tx, y: ty };
      this.plane.updatePlane(mousePos);
    });

    plane.mesh.tick = () => {
      plane.animatePlane();
    };

    return plane;
  }
  // Create Sky
  createSky(nClouds) {
    const sky = new Sky(nClouds);
    sky.setPosition(0, -1000, -100);
    sky.mesh.tick = () => {
    sky.updateRotationZ(this.speed);
    };
    // console.log("Sky", sky.mesh.position.x, sky.mesh.position.y);
    return sky;
  }

  createSea() {
    const sea = new Sea();
    sea.mesh.position.y = -550;

    sea.mesh.tick = (ms) => {
      sea.mesh.rotation.z += this.speed;
    };
    // console.log("Sea", sea.mesh.position.x, sea.mesh.position.y);
    return sea;
  }

  createEnnemy() {
    const ennemiesHolder = new EnnemiesHolder(10);
    
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
      ennemiesHolder.touchPlane(this.sea, delta_pos);
      // newTime = new Date().getTime();
      // let deltaTime = newTime - oldTime;
      // oldTime = newTime;
      // console.log(ra
      let rand = Math.floor(Math.random() * 200);
      // console.log(rand);

      if (rand == 2 || rand == 76) {
        // console.log("Pool:", coinsHolder.coinsPool.length);
        // console.log("InUse:", coinsHolder.coinsInUse.length);
         ennemiesHolder.spawnEnnemies(this.level);
      }
       
    };
    
    // ennemiesHolder.spawnEnnemies(1);
    return ennemiesHolder;
  }
  // createParticle(nParticles) {
  //   const particlesHolder = new ParticlesHolder(nParticles);
  //   particlesHolder.mesh.position.x = 0;
  //   particlesHolder.mesh.position.y = 0;
  //   particlesHolder.mesh.position.z = 0;
  //   return particlesHolder;

  // }
  createCoin() {
    const coinsHolder = new ChainCoin(20);
    let delta_x = 0;
    let delta_y = -1100;
    let delta_z = -70;
    let delta_pos = new Vector3(delta_x, delta_y, delta_z);
    coinsHolder.mesh.position.x = delta_x;
    coinsHolder.mesh.position.y = delta_y;
    coinsHolder.mesh.position.z = delta_z;
    let i = 0;
    let oldTime = 0;
    let newTime = 0;
    
    coinsHolder.mesh.tick = (ms) => {
      coinsHolder.rotationCoins(this.speed);
      coinsHolder.touchPlane(this.plane, delta_pos);
      // console.log(coinsHolder.coinsTouched);
      // console.log(this.plane.mesh.position)
      newTime = new Date().getTime();
      let deltaTime = newTime - oldTime;
      oldTime = newTime;
      // console.log(deltaTime);
      // console.log(coinsHolder.coinsPool.length)
      let rand = Math.floor(Math.random() * 100);
      // console.log(rand);

      if (rand == 16 || rand == 7) {
        // console.log("Pool:", coinsHolder.coinsPool.length);
        // console.log("InUse:", coinsHolder.coinsInUse.length);
        coinsHolder.spawnCoins();
      }
      var score = 0;
      score += coinsHolder.coinsTouched;
      this.score.innerHTML = score;
    };
    return coinsHolder;
  }

  update(ms) {
    this.countLoop += 1;
    if(this.countLoop % 1000 == 0){
      this.speed += this.increaseSpeed;
      console.log(this.countLoop);
      if (this.flagBright) {
        this.flagBright = false;
        this.scene.fog.color.setHSL(0, 0, 0.1);
      }
        this.flagBright = false;
      }
       this.level += 1;
       console.log("level: " + this.level);

    }


    this.sky.mesh.tick();
    this.sea.mesh.tick();
    this.ennemiesHolder.mesh.tick();
    this.chaincoins.mesh.tick();
    this.plane.mesh.tick();
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
  // // checkCollisions() {
  //   var diffPos = airplane.mesh.position.clone().sub(ennemy.mesh.position.clone());
  //   var d = diffPos.length();
  //   if (d < game.ennemyDistanceTolerance) {
  //     console.log("Collision");
  //     ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
  //     this.mesh.remove(ennemy.mesh);
  //     game.planeCollisionSpeedX = (100 * diffPos.x) / d;
  //     game.planeCollisionSpeedY = (100 * diffPos.y) / d;
  //     this.light.hemisphereLight.intensity = 2;

  //     // removeEnergy();
  //     i--;
  //   } else if (ennemy.angle > Math.PI) {
  //     ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
  //     this.mesh.remove(ennemy.mesh);
  //     i--;
  //   }
  // }
}
  

window.addEventListener("load", () => {
  new Game(document.querySelector("#webglOutput"));
});
