import * as THREE from 'three';


function main() {
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const fov = 40;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 20, 50);
// camera.position.set(0, 50, 0); // to see from above
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
{
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
}

const objects = [];
const marsObj = [];

const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

//container pro sistema solar
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

//container pro sistema solar
const marsSystem = new THREE.Object3D();
scene.add(marsSystem);
marsObj.push(marsSystem);

//criação do objeto sol
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
objects.push(sunMesh);

//container pra orbita terra com sua lua
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 15;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);
//objeto terra
const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);
//container pra orbita da lua
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);
//objeto lua
const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5, .5, .5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);



//container pra orbita terra com sua lua
const marsOrbit = new THREE.Object3D();
marsOrbit.position.x = 20;
marsSystem.add(marsOrbit);
marsObj.push(marsOrbit);
//criação do objeto sol
const marsMaterial = new THREE.MeshPhongMaterial({color: 0xFA5600, emissive: 0x400808});
const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
marsOrbit.add(marsMesh);
marsObj.push(marsMesh);





// adiciona eixos direcionais x, y, z
objects.forEach((node) => {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);
  });

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

function render(time) {
    time *= 0.0001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
      obj.rotation.y = time;
    });

    marsObj.forEach((obj) => {
      obj.rotation.y = time/2;
    });


    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
}

main();