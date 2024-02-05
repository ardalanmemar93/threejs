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
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

// Add a controls
const controls = new OrbitControls(camera, renderer.domElement);


// Create a Comet
const cometHeadGeometry = new THREE.SphereGeometry(1, 32, 32);
const cometHeadMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
const cometHead = new THREE.Mesh(cometHeadGeometry, cometHeadMaterial);
scene.add(cometHead);

const cometTailGeometry = new THREE.BufferGeometry();
const cometTailMaterial = new THREE.LineBasicMaterial({ color: 0xFFD700, linewidth: 2 });

const cometTailVertices = [];
for (let i = 0; i < 100; i++) {
  const t = i / 100;
  const x = Math.cos(t * Math.PI * 2) * 5;
  const y = Math.sin(t * Math.PI * 2) * 5;
  const z = -t * 20;

  cometTailVertices.push(x, y, z);
}

cometTailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(cometTailVertices, 3));
const cometTail = new THREE.Line(cometTailGeometry, cometTailMaterial);
scene.add(cometTail);

cometHead.position.set(0, 0, -20);




// Create a Starfield
const starfieldGeometry = new THREE.BufferGeometry();
const starfieldMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

const starfieldVertices = [];
for (let i = 0; i < 5000; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI - Math.PI / 2;
  const radius = 500;

  const x = Math.cos(theta) * Math.cos(phi) * radius;
  const y = Math.sin(phi) * radius;
  const z = Math.sin(theta) * Math.cos(phi) * radius;

  starfieldVertices.push(x, y, z);
}

starfieldGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starfieldVertices, 3));
const starfield = new THREE.Points(starfieldGeometry, starfieldMaterial);
scene.add(starfield);

// Add a background
const spaceTexture = new THREE.TextureLoader().load('dark-space.jpeg');
scene.background = spaceTexture;

// Add a avatar
// const avatarTexture = new THREE.TextureLoader().load('akira-bike.jpeg');
// const avatar = new THREE.Mesh(
// 	new THREE.BoxGeometry(5, 5, 10),
// 	new THREE.MeshBasicMaterial({ map: avatarTexture })
// );
// scene.add(avatar);
// avatar.position.z = -10;
// avatar.position.x = 2;


// Add a sun
const sunTexture = new THREE.TextureLoader().load('sun-sun.jpeg');
const sun = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial(
		{ map: sunTexture }
	)
);
scene.add(sun);
sun.position.z = 30;
sun.position.setX(-10);

// Particle Ring around the Sun
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.1 });

const particlesVertices = [];
for (let i = 0; i < 1000; i++) {
  const radius = 30;
  const theta = Math.random() * Math.PI * 2;
  const x = Math.cos(theta) * radius;
  const y = Math.sin(theta) * radius;
  const z = THREE.MathUtils.randFloatSpread(2);
  particlesVertices.push(x, y, z);
}

particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesVertices, 3));
const particleRing = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleRing);

// Randomized Asteroid Belt
function createAsteroid() {
  const asteroidGeometry = new THREE.SphereGeometry(0.2, 8, 8);
  const asteroidMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

  const radius = THREE.MathUtils.randFloat(35, 45);
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const z = THREE.MathUtils.randFloatSpread(2);

  asteroid.position.set(x, y, z);
  scene.add(asteroid);
}

Array(100).fill().forEach(createAsteroid);

//move camera
function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	sun.rotation.x += 0.05;
	sun.rotation.y += 0.075;
	sun.rotation.z += 0.05;

	avatar.rotation.y += 0.01;
	avatar.rotation.z += 0.01;

	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;


function animate() {
	requestAnimationFrame(animate);
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;
	controls.update();
	renderer.render(scene, camera);
}

animate();

