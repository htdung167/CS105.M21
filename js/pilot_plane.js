import {
  Group,
  Mesh,
  MeshPhongMaterial,
  BoxGeometry,
  MeshLambertMaterial,
  Matrix4,
  Object3D,
} from "https://unpkg.com/three@0.137.5/build/three.module.js";
export class Pilot {
  constructor() {
    this.mesh = new Group();
    this.mesh.name = "pilot";
    // this.angleHairs=0;

    var bodyGeom = new BoxGeometry(15, 15, 15);
    var bodyMat = new MeshPhongMaterial({
      color: 0xff8247,
      flatShading: true,
    });
    this.body = new Mesh(bodyGeom, bodyMat);
    this.body.position.set(2, -12, 0);
    this.mesh.add(this.body);

    var faceGeom = new BoxGeometry(10, 10, 10);
    var faceMat = new MeshLambertMaterial({ color: 0xffc1c1 });
    this.face = new Mesh(faceGeom, faceMat);
    this.mesh.add(this.face);

    var hairGeom = new BoxGeometry(4, 4, 4);
    var hairMat = new MeshLambertMaterial({ color: 0x000000 });
    this.hair = new Mesh(hairGeom, hairMat);
    this.hair.geometry.applyMatrix4(new Matrix4().makeTranslation(0, 2, 0));
    this.hairs = new Group();

    this.hairsTop = new Group();

    for (var i = 0; i < 12; i++) {
      var h = this.hair.clone();
      var col = i % 3;
      var row = Math.floor(i / 3);
      var startPosZ = -4;
      var startPosX = -4;
      h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
      h.geometry.applyMatrix4(new Matrix4().makeScale(1, 1, 1));
      this.hairsTop.add(h);
    }
    this.hairs.add(this.hairsTop);

    var hairSideGeom = new BoxGeometry(12, 4, 2);
    hairSideGeom.applyMatrix4(new Matrix4().makeTranslation(-6, 0, 0));
    var hairSideR = new Mesh(hairSideGeom, hairMat);
    var hairSideL = hairSideR.clone();
    hairSideR.position.set(8, -2, 6);
    hairSideL.position.set(8, -2, -6);
    this.hairs.add(hairSideR);
    this.hairs.add(hairSideL);

    var hairBackGeom = new BoxGeometry(2, 8, 10);
    var hairBack = new Mesh(hairBackGeom, hairMat);
    hairBack.position.set(-1, -4, 0);
    this.hairs.add(hairBack);
    this.hairs.position.set(-5, 5, 0);

    this.mesh.add(this.hairs);

    var glassGeom = new BoxGeometry(5, 5, 5);
    var glassMat = new MeshLambertMaterial({ color: 0x00dd00 });
    this.glassR = new Mesh(glassGeom, glassMat);
    this.glassR.position.set(6, 0, 3);
    this.glassL = this.glassR.clone();
    this.glassL.position.z = -this.glassR.position.z;

    var glassAGeom = new BoxGeometry(11, 1, 11);
    this.glassA = new Mesh(glassAGeom, glassMat);
    this.mesh.add(this.glassR);
    this.mesh.add(this.glassL);
    this.mesh.add(this.glassA);

    var earGeom = new BoxGeometry(2, 3, 2);
    this.earL = new Mesh(earGeom, faceMat);
    this.earL.position.set(0, 0, -6);
    this.earR = this.earL.clone();
    this.earR.position.set(0, 0, 6);
    this.mesh.add(this.earL);
    this.mesh.add(this.earR);
  }
}
export class Plane {
  constructor() {
    this.mesh = new Object3D();
    this.mesh.name = "plane";
    // Cabin

    var geomCabin = new BoxGeometry(80, 50, 50, 1, 1, 1);
    var matCabin = new MeshPhongMaterial({
      color: 0xcd5555,
      flatShading: true,
    });
    // console.log(geomCabin.vertices[x]);
    // geomCabin.vertices[4].y -= 10;
    // geomCabin.vertices[4].z += 20;
    // geomCabin.vertices[5].y -= 10;
    // geomCabin.vertices[5].z -= 20;
    // geomCabin.vertices[6].y += 30;
    // geomCabin.vertices[6].z += 20;
    // geomCabin.vertices[7].y += 30;
    // geomCabin.vertices[7].z -= 20;

    this.cabin = new Mesh(geomCabin, matCabin);
    this.cabin.castShadow = true;
    this.cabin.receiveShadow = true;
    this.mesh.add(this.cabin);

    // Engine

    var geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
    var matEngine = new MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });
    this.engine = new Mesh(geomEngine, matEngine);
    this.engine.position.x = 50;
    this.engine.castShadow = true;
    this.engine.receiveShadow = true;
    this.mesh.add(this.engine);

    // Tail Plane

    var geomTailPlane = new BoxGeometry(15, 20, 5, 1, 1, 1);
    var matTailPlane = new MeshPhongMaterial({
      color: 0xcc0000,
      flatShading: true,
    });
    this.tailPlane = new Mesh(geomTailPlane, matTailPlane);
    this.tailPlane.position.set(-40, 20, 0);
    this.tailPlane.castShadow = true;
    this.tailPlane.receiveShadow = true;
    this.mesh.add(this.tailPlane);

    // Wings

    var geomSideWing = new BoxGeometry(30, 5, 120, 1, 1, 1);
    var matSideWing = new MeshPhongMaterial({
      color: 0xcc0000,
      flatShading: true,
    });
    this.sideWing = new Mesh(geomSideWing, matSideWing);
    this.sideWing.position.set(0, 15, 0);
    this.sideWing.castShadow = true;
    this.sideWing.receiveShadow = true;
    this.mesh.add(this.sideWing);

    var geomWindshield = new BoxGeometry(3, 15, 20, 1, 1, 1);
    var matWindshield = new MeshPhongMaterial({
      color: 0xf8f8ff,
      transparent: true,
      opacity: 0.3,
      flatShading: true,
    });
    this.windshield = new Mesh(geomWindshield, matWindshield);
    this.windshield.position.set(5, 27, 0);

    this.windshield.castShadow = true;
    this.windshield.receiveShadow = true;

    this.mesh.add(this.windshield);

    var geomPropeller = new BoxGeometry(20, 10, 10, 1, 1, 1);
    // geomPropeller.vertices[4].y -= 5;
    // geomPropeller.vertices[4].z += 5;
    // geomPropeller.vertices[5].y -= 5;
    // geomPropeller.vertices[5].z -= 5;
    // geomPropeller.vertices[6].y += 5;
    // geomPropeller.vertices[6].z += 5;
    // geomPropeller.vertices[7].y += 5;
    // geomPropeller.vertices[7].z -= 5;
    var matPropeller = new MeshPhongMaterial({
      color: 0xa0522d,
      flatShading: true,
    });
    this.propeller = new Mesh(geomPropeller, matPropeller);

    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    var geomBlade = new BoxGeometry(1, 80, 10, 1, 1, 1);
    var matBlade = new MeshPhongMaterial({
      color: 0x8b4726,
      flatShading: true,
    });
    var blade1 = new Mesh(geomBlade, matBlade);
    blade1.position.set(8, 0, 0);

    blade1.castShadow = true;
    blade1.receiveShadow = true;

    var blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;

    blade2.castShadow = true;
    blade2.receiveShadow = true;

    this.propeller.add(blade1);
    this.propeller.add(blade2);
    this.propeller.position.set(60, 0, 0);
    this.mesh.add(this.propeller);

    var wheelProtecGeom = new BoxGeometry(30, 15, 10, 1, 1, 1);
    var wheelProtecMat = new MeshPhongMaterial({
      color: 0x726751,
      flatShading: true,
    });
    var wheelProtecR = new Mesh(wheelProtecGeom, wheelProtecMat);
    wheelProtecR.position.set(25, -20, 25);
    this.mesh.add(wheelProtecR);

    var wheelTireGeom = new BoxGeometry(24, 24, 4);
    var wheelTireMat = new MeshPhongMaterial({
      color: 0x8b4726,
      flatShading: true,
    });
    var wheelTireR = new Mesh(wheelTireGeom, wheelTireMat);
    wheelTireR.position.set(25, -28, 25);

    var wheelAxisGeom = new BoxGeometry(10, 10, 6);
    var wheelAxisMat = new MeshPhongMaterial({
      color: 0xcd6839,
      flatShading: true,
    });
    var wheelAxis = new Mesh(wheelAxisGeom, wheelAxisMat);
    wheelTireR.add(wheelAxis);

    this.mesh.add(wheelTireR);

    var wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z;
    this.mesh.add(wheelProtecL);

    var wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.mesh.add(wheelTireL);

    var wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(0.5, 0.5, 0.5);
    wheelTireB.position.set(-35, -5, 0);
    this.mesh.add(wheelTireB);

    var suspensionGeom = new BoxGeometry(4, 20, 4);
    suspensionGeom.applyMatrix4(new Matrix4().makeTranslation(0, 10, 0));
    var suspensionMat = new MeshPhongMaterial({
      color: 0xcd5555,
      flatShading: true,
    });
    var suspension = new Mesh(suspensionGeom, suspensionMat);
    suspension.position.set(-35, -5, 0);
    suspension.rotation.z = -0.3;
    this.mesh.add(suspension);

    this.pilot = new Pilot();
    this.pilot.mesh.position.set(0, 40, 0);
    this.pilot.mesh.scale.set(1.25, 1.25, 1.25);
    this.mesh.add(this.pilot.mesh);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  normalize(v, vmin, vmax, tmin, tmax) {
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + pc * dt;
    return tv;
  }

  updatePlane(mousePos) {
    var targetY = this.normalize(mousePos.y, -0.5, 0.5, 150, 300);
    var targetX = this.normalize(mousePos.x, -0.5, 0.5, -300, 300);
    this.mesh.position.y = targetY;
    this.mesh.position.x = targetX;
    // this.propeller.rotation.x += 0.3;
    // console.log(mousePos);
  }

  animatePlane(){
    this.propeller.rotation.x += 0.2;
  }
  //Check if the plane meet enneimy
  // checkCollision(){
  //   var diffPos = this.mesh.position.clone().sub(ennemy.mesh.position.clone());
  //   var d = diffPos.length();
  //   if (d < 10) {
  //     // console.log("Collision!");
  //     ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
  //     this.mesh.remove(ennemy.mesh);
  //     game.planeCollisionSpeedX = (100 * diffPos.x) / d;
  //     game.planeCollisionSpeedY = (100 * diffPos.y) / d;
  //     ambientLight.intensity = 2;

  //     removeEnergy();
  //     i--;
  //   } else if (ennemy.angle > Math.PI) {
  //     ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
  //     this.mesh.remove(ennemy.mesh);
  //     i--;
  //   }
  // }
}
