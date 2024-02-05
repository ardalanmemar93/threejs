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

// Add controls
const controls = new OrbitControls(camera, renderer.domElement);

// Jupiter
const jupiterGeometry = new THREE.SphereGeometry(10, 32, 32);
const jupiterMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter);

// Jupiter Rings
const numberOfRings = 3;
for (let i = 0; i < numberOfRings; i++) {
  const ringGeometry = new THREE.RingGeometry(12 + i * 2, 14 + i * 2, 64);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x884400, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 4 + (i * Math.PI) / 8; // Tilt each ring for a more interesting appearance
  scene.add(ring);
}

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

  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh && child !== jupiter) {
      child.rotation.x += 0.01; // Rotate each ring along the x-axis
    }
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();
