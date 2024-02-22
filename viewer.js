import * as THREE from 'three';
import { GLTFLoader } from '/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '/addons/controls/OrbitControls.js';

// Camera setup
const camera = new THREE.PerspectiveCamera( 75, 1, 0.01, 20000 );

// Scene setup
const scene = new THREE.Scene();

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x383750 );
renderer.setSize( 500, 500 );
document.getElementById('viewer').appendChild(renderer.domElement);

// Orbit controls setup
const controls = new OrbitControls(camera, renderer.domElement);

// Set camera postion
camera.position.set( 0, 0, 500);
controls.update(); // reminder to update after every camera change

// Lighting
const ambientLight = new THREE.AmbientLight( 0xcccccc );
scene.add( ambientLight );
             
const directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 1, 1 ).normalize();
scene.add( directionalLight );


// Load 3D Model
const loader = new GLTFLoader();

loader.load( '/models/apollo_exterior-150k-4096-gltf/apollo_exterior-150k-4096.gltf', function ( gltf ) {

    gltf.scene.position.x = 0;
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 0;
    scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

// Functions for zoom in and out buttons

const zoomStep = 50; // Control zoom speed

function zoomIn() {
  camera.position.z -= zoomStep; // Move camera closer
  if (camera.position.z < 100) camera.position.z = 100; // Prevent too much zoom in
  controls.update()
}

function zoomOut() {
  camera.position.z += zoomStep; // Move camera further away
  if (camera.position.z > 2000) camera.position.z = 2000; // Prevent too much zoom out
  controls.update()
}


function animate() {

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// EventListeners for buttons
document.getElementById('zoom-in').addEventListener('click', zoomIn);
document.getElementById('zoom-out').addEventListener('click', zoomOut);

