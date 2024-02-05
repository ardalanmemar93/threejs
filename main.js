import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Add controls
const controls = new OrbitControls(camera, renderer.domElement);

// Ground
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Create Buildings
const createBuilding = (width, height, depth, color, position) => {
  const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
  const buildingMaterial = new THREE.MeshStandardMaterial({ color });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.position.copy(position);
  scene.add(building);
};

// Create Roads
const createRoad = (length, width, color, position, rotation) => {
  const roadGeometry = new THREE.BoxGeometry(length, 0.1, width);
  const roadMaterial = new THREE.MeshStandardMaterial({ color });
  const road = new THREE.Mesh(roadGeometry, roadMaterial);
  road.position.copy(position);
  road.rotation.y = rotation;
  scene.add(road);
};

// Create a simple city layout
createBuilding(20, 40, 20, 0x808080, new THREE.Vector3(-30, 20, 30));
createBuilding(30, 30, 30, 0x606060, new THREE.Vector3(0, 15, 0));
createBuilding(25, 35, 25, 0x909090, new THREE.Vector3(30, 17.5, -30));

createRoad(100, 10, 0x888888, new THREE.Vector3(0, 0, 0), 0);
createRoad(100, 10, 0x888888, new THREE.Vector3(0, 0, -50), Math.PI / 2);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 50, 100);
scene.add(pointLight);

// Handle window resize
window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Animation
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
