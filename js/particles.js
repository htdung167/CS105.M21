import {
    TetrahedronGeometry,
    MeshPhongMaterial,
    Mesh,
    Object3D,

} from "https://unpkg.com/three@0.137.5/build/three.module.js";
export class Particle {
    constructor(){
        this.geom = new TetrahedronGeometry(3,0);
        this.mat = new MeshPhongMaterial({
            color:0x009999,
            shininess:0,
            specular:0xffffff,
            flatShading:true,
        });
        this.mesh = new Mesh(this.geom,this.mat);
}
}
export class ParticlesHolder {
    constructor(nP)
    {
        this.mesh = new Object3D();
        this.nP = nP;
        this.particlesInUse = [];
    }
    spawnParticles(pos){
            for(let p = 0; p < this.nP; p++){
                var particle;
                if(this.bumpInUse.length > 0){
                    particle = this.particlesPool.pop();
                }
                else{
                    particle = new Particle();
                }
                this.mesh.add(particle.mesh);
                particle.mesh.position.y = pos.y;
                particle.mesh.position.x = pos.x;  

                }
        }
}