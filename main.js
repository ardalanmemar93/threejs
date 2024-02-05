import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 120, 200);

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

// Create Buildings with Windows (Lit from Inside)
const createBuilding = (width, height, depth, color, position, numWindows) => {
  const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
  const buildingMaterial = new THREE.MeshStandardMaterial({ color });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.position.copy(position);
  scene.add(building);

  // Create windows on each side with emissive material to simulate lighting
  for (let i = 0; i < numWindows; i++) {
    const windowWidth = width / (numWindows + 1);
    const windowHeight = height / 4;
    const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 1);

    const emissiveColor = new THREE.Color(0xff0000); // Adjust emissive color as needed
    const emissiveIntensity = 1;

    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: emissiveColor,
      emissiveIntensity,
    });

    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);

    const offsetX = (i + 1) * windowWidth - width / 2;
    const offsetY = height / 8;

    windowMesh.position.set(offsetX, offsetY, depth / 2 + 0.5);
    building.add(windowMesh);
  }
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

// Create a more complex city layout
createBuilding(30, 160, 30, 0x808080, new THREE.Vector3(-40, 80, 30), 4);
createBuilding(40, 200, 40, 0x606060, new THREE.Vector3(0, 100, 0), 5);
createBuilding(35, 180, 35, 0x909090, new THREE.Vector3(40, 90, -30), 3);

createRoad(120, 10, 0x888888, new THREE.Vector3(0, 0, 0), 0);
createRoad(120, 10, 0x888888, new THREE.Vector3(0, 0, -50), Math.PI / 2);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 150, 200);
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
