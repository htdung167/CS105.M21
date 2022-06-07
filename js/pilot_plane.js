import {
  Group,
  Mesh,
  MeshPhongMaterial,
  BoxGeometry,
  MeshLambertMaterial,
  CylinderGeometry,
  Matrix4,
  Object3D,
  TetrahedronGeometry,
  OctahedronGeometry,
  SphereGeometry,
  TorusGeometry
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

    var armgeom = new BoxGeometry(3, 15, 3, 1, 1, 1);
    var armmat = new MeshPhongMaterial({
      color: 0xa2007c,
      flatShading: true,
    });
    this.armR = new Mesh(armgeom, armmat);
    this.armR.position.set(3, -15, 15);
    this.mesh.add(this.armR);
    this.armL = this.armR.clone();
    this.armL.position.set(3, -15, -15);
    this.mesh.add(this.armL);

    var faceGeom = new BoxGeometry(10, 10, 10);

    var faceMat = new MeshLambertMaterial({ 
      color: 0xffc1c1,
      flatShading: true
     });
    // var faceMat = new MeshPhongMaterial({
    //   color: 0xffc1c1,
    //   flatShading: true,
    // });
    this.face = new Mesh(faceGeom, faceMat);
    this.mesh.add(this.face);

    var hairGeom = new BoxGeometry(4, 4, 4);
    var hairMat = new MeshLambertMaterial({ 
      color: 0x00FF00,
      flatShading: true });
    // var hairMat = new MeshPhongMaterial({
    //   color: 0x00FF00,
    //   flatShading: true,
    // });

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
    var glassMat = new MeshLambertMaterial({ 
      color: 0x0000AA , 
      flatShading:true,
    });
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

    var geomCabin = new BoxGeometry(80, 40, 50, 1, 1, 1);

    var matCabin = new MeshPhongMaterial({
      color: 0x008080,
      flatShading: true,
      specular: 0xcd5555,
      shininess: 50,
    });

    this.cabin = new Mesh(geomCabin, matCabin);
    this.cabin.castShadow = true;
    this.cabin.receiveShadow = true;
    this.mesh.add(this.cabin);

    // Engine

    // var geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
    var geomEngine = new CylinderGeometry(4,20,40,32,1,false,0);
    var matEngine = new MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      specular:0xffffff,
      shininess:150,
    });
    this.engine = new Mesh(geomEngine, matEngine);
    this.engine.position.x = 0;
    this.engine.position.y = 60;
    this.engine.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));
    this.engine.applyMatrix4(new Matrix4().makeRotationY(-Math.PI / 2));
    
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
    this.tailPlane.position.set(-45, 20, 0);
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
    this.sideWing.position.set(0, 10, 0);
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

    var geomBlade = new BoxGeometry(2, 80, 10, 1, 1, 1);
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

    var wheelProtecGeom = new CylinderGeometry(0, 15, 75, 25,18,false,10);
    var wheelProtecMat = new MeshPhongMaterial({
      color: 0x726751,
      flatShading: true,
    });
    var wheelProtecR = new Mesh(wheelProtecGeom, wheelProtecMat);
    wheelProtecR.position.set(10, -10, 20);
    wheelProtecR.applyMatrix4(new Matrix4().makeRotationZ(-Math.PI / 2));
    wheelProtecR.castShadow = true;
    this.mesh.add(wheelProtecR);

    var firegeom = new SphereGeometry(20,32,4,2*Math.PI,2*Math.PI,1.9,3.5);
    var firemat = new MeshPhongMaterial({
       color: 0xC50023,
      flatShading: true,
    });
    this.fireR = new Mesh(firegeom,firemat);
    this.fireR.position.set(-10, 60, 20);
    this.fireR.applyMatrix4(new Matrix4().makeRotationZ(Math.PI / 2));
    this.mesh.add(this.fireR);
    
     this.fireL = this.fireR.clone();
     this.fireL.position.z = -this.fireR.position.z;
     this.mesh.add(this.fireL);

    var firev2geom = new SphereGeometry(10,32,4,2*Math.PI,2*Math.PI,1.9,3.5);
    var firev2mat = new MeshPhongMaterial({
      color: 0xf9f400,
      flatShading: true,
    });
    this.fireRv2 = new Mesh(firev2geom,firev2mat);
    this.fireRv2.position.set(-10, 65, 20);
    this.fireRv2.applyMatrix4(new Matrix4().makeRotationZ(Math.PI / 2));
    this.mesh.add(this.fireRv2);
    
     this.fireLv2 = this.fireRv2.clone();
     this.fireLv2.position.z = -this.fireRv2.position.z;
     this.mesh.add(this.fireLv2);


    var wheelTireGeom = new TorusGeometry(12, 4, 30,128, Math.PI*2);
    var wheelTireMat = new MeshPhongMaterial({
      color: 0xECECEC,
      flatShading: true,
    });
    var wheelTireR = new Mesh(wheelTireGeom, wheelTireMat);
    wheelTireR.position.set(25, -15, 25);

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
    wheelProtecL.castShadow = true;
    this.mesh.add(wheelProtecL);

    var wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.mesh.add(wheelTireL);

    // var wheelTireB = wheelTireR.clone();
    // wheelTireB.scale.set(0.5, 0.5, 0.5);
    // wheelTireB.position.set(-35, -5, 0);
    // this.mesh.add(wheelTireB);

    // var suspensionGeom = new BoxGeometry(4, 80, 4);
    // suspensionGeom.applyMatrix4(new Matrix4().makeTranslation(0, 10, 0));
    // var suspensionMat = new MeshPhongMaterial({
    //   color: 0xcd5555,
    //   flatShading: true,
    // });
    // var suspension = new Mesh(suspensionGeom, suspensionMat);
    // suspension.position.set(-35, -5, 0);
    // suspension.rotation.z = -0.3;
    // this.mesh.add(suspension);

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
    var targetY = this.normalize(mousePos.y, -0.75, 0.75, 160, 300);
    var targetX = this.normalize(mousePos.x, -0.75, 0.75, -200, 200);
    this.mesh.position.y = targetY;
    this.mesh.position.x = targetX;
  }

  animatePlane(){
    this.propeller.rotation.x += 0.2;
    this.fireR.rotation.x += 0.05;
    this.fireL.rotation.x += 0.05;
    this.fireRv2.rotation.x -= 0.01;
    this.fireLv2.rotation.x -= 0.01;
  }
  //Check if the plane meet enneimy
  
}
