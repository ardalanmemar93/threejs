import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cherry Tree
const trunkGeometry = new THREE.CylinderGeometry(1, 1, 8, 16);
const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
scene.add(trunk);

const branchGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 16);
const branchMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
const branch1 = new THREE.Mesh(branchGeometry, branchMaterial);
branch1.position.set(0, 5, 0);
scene.add(branch1);

const branch2 = new THREE.Mesh(branchGeometry, branchMaterial);
branch2.position.set(0, 7, 0);
scene.add(branch2);

// Additional Branches
const branch3 = new THREE.Mesh(branchGeometry, branchMaterial);
branch3.position.set(1, 5, 0);
scene.add(branch3);

const branch4 = new THREE.Mesh(branchGeometry, branchMaterial);
branch4.position.set(0, 9, 0);
scene.add(branch4);

const branch5 = new THREE.Mesh(branchGeometry, branchMaterial);
branch5.position.set(-2, 7, 0);
scene.add(branch5);

// Blossoms
const blossomGeometry = new THREE.SphereGeometry(0.5, 16, 16); // Adjusted radius for smaller blossoms
const blossomMaterial = new THREE.MeshBasicMaterial({ color: 0xFFC0CB });
const blossoms = [];

for (let i = 0; i < 200; i++) {
  const blossom = new THREE.Mesh(blossomGeometry, blossomMaterial);
  const radius = Math.random() * 5 + 5; // Random radius for spread
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.random() * 8 + 7;
  const z = Math.sin(angle) * radius;
  blossom.position.set(x, y, z);
  blossoms.push(blossom);
  scene.add(blossom);
}

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Blossoms gently sway
  blossoms.forEach((blossom, index) => {
    const time = Date.now() * 0.001;
    blossom.position.y += Math.sin(time + index) * 0.005;
  });

  controls.update();

  renderer.render(scene, camera);
}

animate();
