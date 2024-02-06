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



  // Function to create a creature
const createCreature = (position) => {
	const bodyGeometry = new THREE.BoxGeometry(8, 8, 8);
	const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500 });
	const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  
	const headGeometry = new THREE.SphereGeometry(6, 32, 32);
	const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
	const head = new THREE.Mesh(headGeometry, headMaterial);
	head.position.set(0, 10, 0);
  
	const tailGeometry = new THREE.CylinderGeometry(1, 3, 20, 8);
	const tailMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500 });
	const tail = new THREE.Mesh(tailGeometry, tailMaterial);
	tail.position.set(0, -15, 0);
  
	const legsGeometry = new THREE.BoxGeometry(2, 10, 2);
	const legsMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
	const legs1 = new THREE.Mesh(legsGeometry, legsMaterial);
	const legs2 = new THREE.Mesh(legsGeometry, legsMaterial);
	legs1.position.set(-5, -7, 0);
	legs2.position.set(3, -7, 0);
  
	const creature = new THREE.Group();
	creature.add(body, head, tail, legs1, legs2);
	creature.position.copy(position);
  
	scene.add(creature);
  };
  
  // Create a creature in the middle of the scene
  createCreature(new THREE.Vector3(0, 5, 0));
  

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


// Function to create a UFO
const createUFO = (position) => {
	const saucerGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
	const saucerMaterial = new THREE.MeshStandardMaterial({
	  color: 0x808080,
	  emissive: 0xffff00, // Yellow emissive lights
	  emissiveIntensity: 0.5,
	  metalness: 0.5,
	});
	const saucer = new THREE.Mesh(saucerGeometry, saucerMaterial);
  
	const lightGeometry = new THREE.PointLight(0xffff00, 2, 30);
	const light = new THREE.PointLight(lightGeometry.color, lightGeometry.intensity, lightGeometry.distance);
	light.position.set(0, 0, 10);
	saucer.add(light);
  
	saucer.position.copy(position);
	scene.add(saucer);
  
	return saucer;
  };
  
  // Create a UFO hovering above the city
  const ufo = createUFO(new THREE.Vector3(0, 100, 50));
  
  // Animate the UFO's rotation
  function animateUFO() {
	ufo.rotation.y += 0.01;
	ufo.rotation.z += 0.005;
  }


// Function to create a planet with ring
const createPlanetWithRing = (position) => {
	// Create planet
	const planetGeometry = new THREE.SphereGeometry(15, 32, 32);
	const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x2266FF });
	const planet = new THREE.Mesh(planetGeometry, planetMaterial);
	planet.position.copy(position);
	scene.add(planet);
  
	// Create ring particles
	const ringParticlesGeometry = new THREE.BufferGeometry();
	const ringParticlesMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.5 });
  
	const ringParticlesVertices = [];
	for (let i = 0; i < 500; i++) {
	  const theta = Math.random() * Math.PI * 2;
	  const phi = Math.random() * Math.PI;
	  const radius = 20;
  
	  const x = Math.cos(theta) * Math.sin(phi) * radius;
	  const y = Math.cos(phi) * radius;
	  const z = Math.sin(theta) * Math.sin(phi) * radius;
  
	  ringParticlesVertices.push(x, y, z);
	}
  
	ringParticlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ringParticlesVertices, 3));
	const ringParticles = new THREE.Points(ringParticlesGeometry, ringParticlesMaterial);
	planet.add(ringParticles);
  
	return planet;
  };
  
  // Create a planet with a ring
  const planetWithRing = createPlanetWithRing(new THREE.Vector3(40, 60, 0));
  
  // Animate the planet's rotation
  function animatePlanetWithRing() {
	planetWithRing.rotation.y += 0.005;
  }

  // Function to create a rotating star cluster
const createStarCluster = (position, color, numStars, clusterRadius) => {
	const starCluster = new THREE.Group();
  
	for (let i = 0; i < numStars; i++) {
	  const starGeometry = new THREE.SphereGeometry(0.5, 16, 16);
	  const starMaterial = new THREE.MeshStandardMaterial({ color });
	  const star = new THREE.Mesh(starGeometry, starMaterial);
  
	  const theta = Math.random() * Math.PI * 2;
	  const phi = Math.random() * Math.PI - Math.PI / 2;
	  const radius = Math.random() * clusterRadius;
  
	  const x = Math.cos(theta) * Math.cos(phi) * radius;
	  const y = Math.sin(phi) * radius;
	  const z = Math.sin(theta) * Math.cos(phi) * radius;
  
	  star.position.set(x, y, z);
	  starCluster.add(star);
	}
  
	starCluster.position.copy(position);
	scene.add(starCluster);
  
	return starCluster;
  };
  
  // Create a rotating star cluster
  const rotatingStarCluster = createStarCluster(new THREE.Vector3(-30, 80, 0), 0xFFFFFF, 100, 30);
  
  // Animate the rotation of the star cluster
  function animateRotatingStarCluster() {
	rotatingStarCluster.rotation.y += 0.005;
  }

  // Function to create a bird
const createBird = (position) => {
	const birdGeometry = new THREE.BoxGeometry(2, 0.5, 0.5);
	const birdMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
	const bird = new THREE.Mesh(birdGeometry, birdMaterial);
  
	bird.position.copy(position);
	bird.rotation.y = Math.PI / 4;
  
	scene.add(bird);
  
	return bird;
  };
  
  // Function to create a flock of birds
  const createBirdFlock = (numBirds, flockRadius) => {
	const birdFlock = new THREE.Group();
  
	for (let i = 0; i < numBirds; i++) {
	  const theta = Math.random() * Math.PI * 2;
	  const radius = Math.random() * flockRadius;
  
	  const x = Math.cos(theta) * radius;
	  const y = THREE.MathUtils.randFloatSpread(10) + 30;
	  const z = Math.sin(theta) * radius;
  
	  const bird = createBird(new THREE.Vector3(x, y, z));
	  birdFlock.add(bird);
	}
  
	scene.add(birdFlock);
  
	return birdFlock;
  };
  
  // Create a flock of birds
  const birdFlock = createBirdFlock(20, 50);
  
  // Animate the movement of the bird flock
  function animateBirdFlock() {
	birdFlock.children.forEach((bird) => {
	  bird.position.x += 0.1;
	  if (bird.position.x > 50) bird.position.x = -50;
	});
  }

  // Function to create a firework
const createFirework = () => {
	const fireworkGeometry = new THREE.SphereGeometry(0.2, 8, 8);
	const fireworkMaterial = new THREE.MeshBasicMaterial({ color: getRandomColor() });
	const firework = new THREE.Mesh(fireworkGeometry, fireworkMaterial);
  
	const startPosition = new THREE.Vector3(THREE.MathUtils.randFloatSpread(40), 20, THREE.MathUtils.randFloatSpread(40));
	firework.position.copy(startPosition);
  
	scene.add(firework);
  
	return firework;
  };
  
  // Function to generate a random color
  const getRandomColor = () => {
	const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFA500, 0xFF00FF, 0xFFFF00];
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
  };
  
  // Function to animate the fireworks
  const animateFireworks = (fireworks) => {
	fireworks.forEach((firework) => {
	  firework.position.y -= 0.2;
	  if (firework.position.y <= 0) {
		firework.position.y = 20;
		firework.position.x = THREE.MathUtils.randFloatSpread(40);
		firework.position.z = THREE.MathUtils.randFloatSpread(40);
		firework.material.color.set(getRandomColor());
	  }
	});
  };
  
  // Create an array to hold multiple fireworks
  const fireworks = Array(50).fill().map(createFirework);




// Animation
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);

  animateUFO();
  animatePlanetWithRing();
  animateRotatingStarCluster();
  animateBirdFlock();
  animateFireworks(fireworks);
}

animate();
