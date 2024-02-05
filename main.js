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
const createSkyscraper = (width, depth, numFloors, numColumns, numWindowsPerColumn, color, position) => {
  const floorHeight = 5;
  const windowWidth = width / (numColumns + 1);
  const windowHeight = floorHeight / (numWindowsPerColumn + 1);

  for (let floor = 0; floor < numFloors; floor++) {
    const buildingGeometry = new THREE.BoxGeometry(width, floorHeight, depth);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);

    building.position.set(position.x, position.y + floor * floorHeight, position.z);
    scene.add(building);

    // Create windows on each floor
    for (let col = 0; col < numColumns; col++) {
      for (let i = 0; i < numWindowsPerColumn; i++) {
        const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 1);
        const windowMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: new THREE.Color(0xffcc00), // Adjust emissive color as needed
          emissiveIntensity: 1,
        });

        const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);

        const offsetX = (col + 1) * windowWidth - width / 2;
        const offsetY = (i + 1) * windowHeight - floorHeight / 2;

        windowMesh.position.set(offsetX, offsetY, depth / 2 + 0.5);
        building.add(windowMesh);
      }
    }
  }
};




// Function to create a simple tree
const createTree = (position) => {
	const trunkGeometry = new THREE.CylinderGeometry(1, 1, 10, 8);
	const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
	const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  
	const leavesGeometry = new THREE.ConeGeometry(5, 15, 8);
	const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
	const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
  
	trunk.position.copy(position);
	leaves.position.set(position.x, position.y + 10, position.z);
  
	scene.add(trunk, leaves);
  };
  
  // Create a row of trees along the road
  const numTrees = 10;
  const spacing = 20;
  
  for (let i = 0; i < numTrees; i++) {
	const treePosition = new THREE.Vector3(-50 + i * spacing, 0, 0);
	createTree(treePosition);
  }

// Create a Skyscraper
createSkyscraper(20, 20, 10, 2, 6, 0x808080, new THREE.Vector3(-40, 0, 30));

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
