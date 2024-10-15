import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'
import { Wireframe } from 'three/examples/jsm/Addons.js';
import { fog } from 'three/examples/jsm/nodes/Nodes.js';
// import earth from 'earth2.jpeg';
// import star from 'stars.webp';


const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled=true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMap.enabled=true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );

const control=new OrbitControls(camera,renderer.domElement);

const textureload=new THREE.TextureLoader();
const back=textureload.load("../src/stars.webp"
);
scene.add(back);
console.log(back);

const boxgeo = new THREE.BoxGeometry( 1, 1, 1 );
const boxmat = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
const cube = new THREE.Mesh( boxgeo, boxmat );
scene.add( cube );
cube.castShadow=true;

const planegeo=new THREE.PlaneGeometry(30,30);
const planemat=new THREE.MeshStandardMaterial({color:0xFFFFFF,side:THREE.DoubleSide});
const plane=new THREE.Mesh(planegeo,planemat);
scene.add(plane);
plane.rotation.x=-0.5* Math.PI;
plane.receiveShadow=true;

const gridhelp=new THREE.GridHelper(30);
scene.add(gridhelp);

const spheregeo = new THREE.SphereGeometry( 4,50,50);
const spheremat = new THREE.MeshStandardMaterial( { color: 0x6A1B9A,//wireframe:true 
	} );
const sphere = new THREE.Mesh( spheregeo, spheremat );
scene.add( sphere);
sphere.position.set(-10,10,0);
sphere.castShadow=true;

const ambient=new THREE.AmbientLight(0x333333);
scene.add(ambient);

const directionlt=new THREE.DirectionalLight(0xFFFFFF,1);
scene.add(directionlt);
directionlt.position.set(-30,50,0);
directionlt.castShadow=true;
directionlt.shadow.camera.bottom=-12;
const dir_hel=new THREE.DirectionalLightHelper(directionlt,4);
scene.add(dir_hel)

const dl_lt_shadow_hel=new THREE.CameraHelper(directionlt.shadow.camera);
scene.add(dl_lt_shadow_hel);

// const spot_li=new THREE.SpotLight(0xFFFFFF);
// scene.add(spot_li);
// spot_li.position.set(-50,50,0);
// spot_li.castShadow=true;
// spot_li.angle=0.1;

// const spot_li_hel=new THREE.SpotLightHelper(spot_li);
// scene.add(spot_li_hel);

scene.fog=new THREE.Fog(0xFFFFFF,0.1);


const gui=new dat.GUI();

const options={
	sphereColor:'#ffea00',
	wireframe:false,
	speed:0.01,
	angle:0.2,
	target:0.2,
	intensity:1
};
gui.addColor(options,'sphereColor').onChange(function(e){
	sphere.material.color.set(e);
});
gui.add(options,'wireframe').onChange(function(e){
	sphere.material.wireframe=e;
});
gui.add(options,'speed',0,0.1);
gui.add(options,'intensity',0,0.1);




const axishelp=new THREE.AxesHelper(3);
scene.add(axishelp);
console.log(axishelp);


camera.position.set(0,2,5);
control.update();

let step=0;


function animate() {

	// cube.rotation.x += 0.11;
	// cube.rotation.z += 0.11;
	step+=options.speed;
	sphere.position.y=10*Math.abs(Math.sin(step));
   directionlt.intensity=options.intensity;
	dir_hel.update();

	renderer.render( scene, camera );

	

}
renderer.setAnimationLoop(animate);
