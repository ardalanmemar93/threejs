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

// Create Skyscraper
const createSkyscraper = (width, depth, numFloors, numWindowsPerFloor, color, position) => {
  const floorHeight = 5;
  const windowWidth = width / (numWindowsPerFloor + 1);
  const windowHeight = floorHeight / 2;

  for (let floor = 0; floor < numFloors; floor++) {
    const buildingGeometry = new THREE.BoxGeometry(width, floorHeight, depth);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);

    building.position.set(position.x, position.y + floor * floorHeight, position.z);
    scene.add(building);

    // Create windows on each floor
    for (let i = 0; i < numWindowsPerFloor; i++) {
      const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 1);
      const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: new THREE.Color(0xffcc00), // Adjust emissive color as needed
        emissiveIntensity: 1,
      });

      const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);

      const offsetX = (i + 1) * windowWidth - width / 2;
      const offsetY = floorHeight / 4;

      windowMesh.position.set(offsetX, offsetY, depth / 2 + 0.5);
      building.add(windowMesh);
    }
  }
};

// Create a Skyscraper
createSkyscraper(20, 20, 10, 4, 0x808080, new THREE.Vector3(-40, 0, 30));

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
