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
const geometry = new THREE.TorusKnotGeometry( 7.163, 0.386, 300, 20, 12, 11); 
// Create a material
const material = new THREE.MeshBasicMaterial( { color: 0x00FFFF }, { wireframe: true }); 
// Create a mesh
const torus = new THREE.Mesh( geometry, material ); scene.add( torus );



function animate() {
	requestAnimationFrame(animate);
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;
	renderer.render(scene, camera);
}

animate();
