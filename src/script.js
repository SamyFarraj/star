import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Group } from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */


//first sheap
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}




/*
//add texture 
for sheap 
// */
const textrueloader=new THREE.TextureLoader()

const texture2= textrueloader.load('/textures/door/fd.jpg')
const texture3= textrueloader.load('/textures/door/earth.jpg')
const texture_earth= textrueloader.load('/textures/door/earth2.jpg')
const sun_texture= textrueloader.load('/textures/door/sun_texture.jpg')

const texture1= textrueloader.load('/textures/environmentMaps/1/nx.jpg')

const trade ={
    x:0.55
   }



//const generalmatrial=new THREE.MeshLambertMaterial()
//const generalmatrial=new THREE.MeshBasicMaterial()


//generalmatrial.map=texture_earth
//generalmatrial.color=new THREE.Color("red")
//generalmatrial.wireframe=true






//const generalmatrial =new THREE.MeshNormalMaterial()
//لاتجربها مع تيكتشر مو نصيحة يع 
//generalmatrial.bumpMap=texture1
let textureLoader = new THREE.TextureLoader();

 // Galaxy
let galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
let galaxyMaterial = new THREE.MeshBasicMaterial({
  side: THREE.BackSide
});
let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

// Load Galaxy Textures
textureLoader.crossOrigin = true;
textureLoader.load(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
  function(texture) {
    galaxyMaterial.map = texture;
    scene.add(galaxy);
  }
);


const generalmatrial =new THREE.MeshMatcapMaterial()
generalmatrial.matcap=texture3

const geometry = new THREE.SphereGeometry(0.55, 30, 32 );
const eatrh = new THREE.Mesh( geometry, generalmatrial );
scene.add( eatrh );
eatrh.position.x=-2



const sun_mesh=new THREE.MeshBasicMaterial(
)
sun_mesh.map=sun_texture
const geometry_sun = new THREE.SphereGeometry(1.9, 30, 32 );

const moon= new THREE.Mesh(geometry_sun,sun_mesh)

moon.position.x=+4
scene.add(moon)
/*
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



*/

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.x = 1
camera.position.y = 1
camera.position.z = 2

scene.add(camera)


/***
 * اضافة ال 
 * gui 
 * we creat object from gui 
 */


 const gui = new dat.GUI()

 gui.add(trade,'x')
 .min(0.009)
 .max(0.9)
 .step(0.002)
 .name('size planet ')
 

 const parameters = { 
     color: 0xffff0,
 }
/**
 * to add color to control panel 
 * you shuold use gui.adddcolor
 */

gui.addColor(parameters,'color')
.onChange(()=>
{
    console.log('color is ')
  // generalmatrial.color.set(parameters.color)


})

//generalmatrial.color.set(parameters.color)



gui.addFolder('property new cuib')




// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * add light 
 * minute 35 in video 12 
 * 
 */

//creat an ambientlight
const ambientlight=new THREE.AmbientLight(0xff00,0.5)
scene.add(ambientlight)

//2 creat point light 

const pointlight =new THREE.PointLight(0xfffff,0.5)
pointlight.position.x=9
pointlight.position.y=-10
pointlight.position.z=0

scene.add(pointlight)

//3 use meshlamber Matreal 


//mouse 
const crouser= {
    x:0,
    y:0,
    z:0,
}
window.addEventListener('mousemove',
(eva)=>
{

    console.log(eva.clientX)
    crouser.x=eva.clientX
    crouser.y=eva.clientY
}
)


const group=new THREE.Group()
const mouse =new THREE.Vector2()
const intersectionpoint = new THREE.Vector3()
const plannormal =new THREE.Vector3()
const plane =new THREE.Plane()
const raycaster =new THREE.Raycaster()

window.addEventListener('mousemove',function(e){

    mouse.x=(e.clientX/this.window.innerWidth)*2-1
    mouse.y=-(e.clientY/this.window.innerHeight)*2+1
    plannormal.copy(camera.position).normalize()
    plane.setFromNormalAndCoplanarPoint(plannormal,scene.position)
    raycaster.setFromCamera(mouse,camera)
    raycaster.ray.intersectPlane(plane,intersectionpoint)

}) 

window.addEventListener('dblclick',function(e){
    const geometry = new THREE.SphereGeometry(trade.x, 30, 32 );
const eatrh = new THREE.Mesh( geometry, generalmatrial );
//scene.add( eatrh );
const elapsedTime = clock.getElapsedTime()

eatrh.position.copy(intersectionpoint)
group.add(eatrh)
scene.add(group)
})


/**
 * Animate
 */


const clock = new THREE.Clock()

const tick = () =>
{
// camera.position.y=elapsedTime*0.01
    const elapsedTime = clock.getElapsedTime()
// camera.position.x=Math.sin(Math.PI*0.01*elapsedTime)
 //camera.position.z=Math.cos(Math.PI*0.01*elapsedTime)
//camera.position.y=-5


    camera.lookAt(moon.position)
  //group.position.x=+elapsedTime
 //camera.position.x=crouser.x

//mesh.rotation.y=elapsedTime*0.5
 //   mesh1.rotation.z=elapsedTime*0.5
 //   sphere.rotation.x=elapsedTime*0.2
   // mesh3.rotation.z=elapsedTime*0.5
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()