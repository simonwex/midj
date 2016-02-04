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
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

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


var render = function() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.02;
  cube.rotation.y += 0.03;

  if (cube.scale.x > 1){
    cube.scale.x -= 0.04;
    cube.scale.y -= 0.04;
    cube.scale.z -= 0.04;
  }

  renderer.render(scene, camera);
};

render();

//var colors = ['0x00ff00', '0xff0000'];

ipc.on('beat', function(){
  cube.scale.set(1.5, 1.5, 1.5);

  renderer.render(scene, camera);
  //material.color = colors[0];
  //colors.push(colors.shift());
});
