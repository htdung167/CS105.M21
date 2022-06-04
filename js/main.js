  
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
  Audio
  // requestAnimationFrame
} from "https://unpkg.com/three@0.137.5/build/three.module.js";

import { Plane } from "./pilot_plane.js";
import { Sky } from "./sky.js";
import { Sea } from "./sea.js ";
import { Light } from "./light.js";
import { Ennemy, EnnemiesHolder } from "./ennemy.js";
import { ChainCoin } from "./coin.js";
import { ParticlesHolder, Particle } from "./particles.js";
var ennemiesPool = [];
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

var status = 'playing';

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
    this.ennemiesHolder = this.createEnnemy(50);
    this.scene.add(this.ennemiesHolder.mesh);
    // Add coin test
    this.chaincoins = this.createCoin(500);
    this.scene.add(this.chaincoins.mesh);

    // score
    // this.score = 0;

    // speed
    this.initSpeed = 0.001;
    this.speed = 0.001;
    this.increaseSpeed = 0.001;
    this.countLoop = 1;
    this.level = 1;

    // game status
    this.status = 'playing'
    // this.status = 'gameover'
    this.oldScoreValue = 0;
    this.scoreValue = 0;
    this.score = document.getElementById("score_playing");
    this.can = document.getElementById("webglOutput");

    document.getElementById('play_icon').click();

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

    // Xử lý replay game
    document.addEventListener('mousedown', () => {
      if(this.status==='gameover'){
        this.playingGame();
      }
    }, false)
    // window.location.reload();
  }

  // Create Scene
  createScene() {
    const scene = new Scene();
    scene.background = new Color(0xffcc99);
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
    sky.setPosition(0, -1050, -100);
    sky.mesh.tick = () => {
      sky.updateRotation(this.speed);
    };
    return sky;
  }

  createSea() {
    const sea = new Sea();
    sea.mesh.position.y = -550;

    sea.mesh.tick = (ms) => {
      sea.mesh.rotation.z += this.speed;
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
        // console.log("Pool:", coinsHolder.coinsPool.length);
        // console.log("InUse:", coinsHolder.coinsInUse.length);
         ennemiesHolder.spawnEnnemies(this.level);
      }
      // Tiếng va chạm
      let audioLoader = new AudioLoader();
      let listener = new AudioListener();
      let audio = new Audio(listener);
      let stream = "./sound/crash.mp3"
      if(ennemiesHolder.ennemiesTouched){
        // Tiếng va chạm
        audioLoader.load(stream, function(buffer) {
          audio.setBuffer(buffer);
          audio.setLoop(false);
          audio.play();
        });
        this.level = 1;
        this.status='gameover';
        this.score.style.display = "none";
        document.getElementById('game-over-container').style.display='block';
        
      }
    };
    
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

    // Thêm nhạc khi chạm
    let audioLoader = new AudioLoader();
    let listener = new AudioListener();
    let audio = new Audio(listener);
    let stream = "./sound/coin_audio.mp3"
    

    coinsHolder.mesh.tick = (ms) => {
      coinsHolder.rotationCoins(this.speed);
      coinsHolder.touchPlane(this.plane, delta_pos);
      let rand = Math.floor(Math.random() * 100);
      if (rand == 16 || rand == 7) {
        coinsHolder.spawnCoins();
      }
      this.scoreValue = coinsHolder.coinsTouched;
      this.score.innerHTML = "Score: " + this.scoreValue + " Level: " + this.level;

      // Thêm nhạc khi va chạm 
      if(this.status === 'playing'){
        if(this.scoreValue != this.oldScoreValue && this.scoreValue != 0){
          this.oldScoreValue = this.scoreValue
          if(audio.isPlaying){
            audio.stop();
          }
          audioLoader.load(stream, function(buffer) {
            audio.setBuffer(buffer);
            audio.setLoop(false);
            audio.play();
          });
        }
      }
    };
    return coinsHolder;
  }

  // Hàm check nếu game over set lại các tham số
  checkGameOver(){
    if(this.status==='gameover'){
      document.getElementById("score_gameover").innerHTML = "Score: " + this.oldScoreValue; // Set score cuối cùng
      this.speed=this.initSpeed; // Đặt lại speed như ban đầu
      this.chaincoins.coinsTouched = 0; // Set số coin đã chạm về 0
      this.scoreValue = 0; // Set score về 0
      this.countLoop = 0;
      this.level = 1;
      this.ennemiesHolder.ennemiesTouched = false; // Set lại ennemiesTouched = false (chưa chạm)

      // this.score
      //Add hàm rơi máy bay ở đây



      // Cho plane ở vị trí cố định (góc never die)
      this.plane.mesh.position.x = -160;
      this.plane.mesh.position.y = 300;
      this.plane.mesh.position.z = -70;
    }
    // console.log(this.speed)
  }

  // Khi listen thấy mouse up thì gọi hàm này, set lại các tham số
  playingGame(){
    this.status = 'playing' // Trả lại trạng thái playing
    document.getElementById('game-over-container').style.display = 'none'; // Ẩn button play
    this.score.style.display='block' // Hiển thị lại score
  }

  update(ms) {
    this.checkGameOver();
    this.countLoop += 1;
    console.log(this.speed);
    if(this.countLoop % 1000 == 0){
      this.speed += this.increaseSpeed;
      this.level += 1;
      // Thêm hàm tăng số đá ở đây
      // Thay Bg
      if (this.flagBrightness){
        this.scene.background = new Color(0x003366); 
        this.flagBrightness = false;
      }
      else{
        this.scene.background = new Color(0xffcc99);
        this.flagBrightness = true;
      }

      // console.log(this.countLoop);
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