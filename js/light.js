import {
  HemisphereLight,
  DirectionalLight,
} from "https://unpkg.com/three@0.137.5/build/three.module.js";

export class Light{
constructor(){
    this.hemisphereLight = new HemisphereLight(0xaaaaaa,0x000000, .9)
    this.shadowLight = new DirectionalLight(0xffffff, .9);
    this.shadowLight.position.set(150, 350, 350);
    this.shadowLight.castShadow = true;
    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;
    }
}
