import './style.css'
import * as THREE from 'three';

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
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// Create a material
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: true });
// Create a mesh
const torus = new THREE.Mesh(geometry, material);
// Add the mesh to the scene
scene.add(torus);


function animate() {
	requestAnimationFrame(animate);
	// torus.rotation.x += 0.01;
	// torus.rotation.y += 0.005;
	// torus.rotation.z += 0.01;
	renderer.render(scene, camera);
}

animate();
