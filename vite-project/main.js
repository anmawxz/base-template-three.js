import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap"
import "./style.css"

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}


//Scene
const scene = new THREE.Scene();


//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  roughness: 0.5, //define um foco de luz o qual causará impressao de superficie 3d
})

const mesh = new THREE.Mesh(geometry, material); //mistura objeto com sua textura
scene.add(mesh)




//Light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
light.intensity = 1.25
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height , 0.1 ,200)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true //animação continua mesmo apos soltar o mouse
controls.enablePan = false 
controls.enableZoom = false //proibe zoom do scroll
controls.autoRotate = true
controls.autoRotateSpeed = 5



//Resize
window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()//faz reajuste automatico do tamanho do objeto
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  //atualiza para que a esfera continue girando
  controls.update()
  //atualiza o tamanho da tela
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()


//Timeline magiccc
const tl = gsap.timeline({defaults: {duration:1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo("nav", {y:"-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})


//Mouse animation colorrrr
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width * 255)),
      Math.round((e.pageY / sizes.width * 255)),
      150,
    ]

    //lets animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    new THREE.Color(`rgb(0,100,150)`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b
    })

  }
})
