import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Renderer 
const renderer = new THREE.WebGLRenderer({
	  canvas: document.querySelector('#bg'),
});
// Set the size of the renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// Set the camera position
camera.position.setZ(30);

renderer.render(scene, camera);

// Create a torus(Geometry)
const geometry = new THREE.TorusKnotGeometry( 7.163, 0.386, 300, 20, 12, 11); 
// Create a material
const material = new THREE.MeshStandardMaterial( { color: 0x00FFFF }); 
// Create a mesh and add to the scene
const torus = new THREE.Mesh( geometry, material ); scene.add( torus );

// Create a point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1,1,1);

// Create an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
// Add light to the scene
scene.add(pointLight, ambientLight);

// Add a helper to the light
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// Add a grid helper
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// Add a controls
const controls = new OrbitControls(camera, renderer.domElement);



function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill().forEach(addStar);

// Add a background
const spaceTexture = new THREE.TextureLoader().load('dark-space.jpeg');
scene.background = spaceTexture;



function animate() {
	requestAnimationFrame(animate);
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;
	controls.update();
	renderer.render(scene, camera);
}

animate();
