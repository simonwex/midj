'use strict';

var ipc = require('ipc-renderer');
var remote = require('remote');
var Tray = remote.require('tray');

var scene = new THREE.Scene();

var ratio = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;


document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 2, 1);
var color = new THREE.Color(0x00ff00);
var material = new THREE.MeshBasicMaterial({ color: color.getHex() });

var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;

scene.add(cube);

camera.position.z = 9;

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}


var spotLight = new THREE.SpotLight(0xffffff);
spotLight.castShadow = true;

scene.add(spotLight);

var settleCubeScale = 1;

var render = function() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.02;
  cube.rotation.y += 0.03;

  cube.scale.x -= (cube.scale.x - settleCubeScale) * .5;
  cube.scale.y -= (cube.scale.y - settleCubeScale) * .5;
  cube.scale.z -= (cube.scale.z - settleCubeScale) * .5;

  renderer.render(scene, camera);
};

render();

//var colors = ['0x00ff00', '0xff0000'];

ipc.on('oxygen:pitch', function (e, data) {
  settleCubeScale = data.value/127*3 + 0.1;
});

ipc.on('oxygen:modulate', function (e, data) {
  // color.g = data.value/127;
  // console.log(color.g, color.getHexString());
  material.color.g = data.value/127;
});

ipc.on('oxygen:keydown', function (data){
  cube.scale.set(settleCubeScale * 1.5, settleCubeScale * 1.5, settleCubeScale * 1.5);
});

ipc.on('beat', function(){
  cube.scale.set(settleCubeScale + 1.5, settleCubeScale + 1.5, settleCubeScale + 1.5);
});
