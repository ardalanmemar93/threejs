import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Add a controls
const controls = new OrbitControls(camera, renderer.domElement);

// Jupiter
const jupiterGeometry = new THREE.SphereGeometry(10, 32, 32);
const jupiterMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter);

// Jupiter Ring
const ringGeometry = new THREE.RingGeometry(12, 20, 64);
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x884400, side: THREE.DoubleSide });
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI / 3; // Tilt the ring for a more realistic appearance
scene.add(ring);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 0, 50);
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

  jupiter.rotation.y += 0.005; // Rotate Jupiter
  ring.rotation.x += 0.005; // Rotate the ring

  controls.update();
  renderer.render(scene, camera);
}

animate();
