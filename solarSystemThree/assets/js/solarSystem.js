var scene, camera, renderer;
var params;
var mousedown = false;
var textureLoader;

function getParams() {
	return {
		sunRotSpeedy: 0.001,
		earthRotSpeedY: 0.002,
		venusRotSpeedY: 0.005,
		jupiterRotSpeedY: 0.001,

		earthOrbitSpeed: 0.002,
		moonOrbitSpeedy: 0.003,
		moonOrbitSpeedx: 0.0005,
		venusOrbitSpeed: 0.001,
		jupiterOrbitSpeed: 0.001
	};
}

window.onload = function()  {
	if (Detector.webgl) {
	    init();
		var objects = createObjects();
		alterObjects(objects);
		render(objects);
		addListeners();
	} else {
	    var warning = Detector.getWebGLErrorMessage();
	    document.getElementById('container').appendChild(warning);
	}
}

function init() {
	params = getParams();
	scene = new THREE.Scene();
	// vertical angle of view, ratio, near, far
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

	textureLoader = new THREE.TextureLoader();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild( renderer.domElement );

	camera.position.z = 40;
	camera.position.y = 20;
	//camera.rotation.x = -0.5;
	camera.lookAt(new THREE.Vector3(0,0,0));
}

function createObjects() {
	var parent = new THREE.Object3D();
	scene.add(parent);

	//SUN
	var sunTexture = textureLoader.load("assets/img/textures/sunmap.jpg");
	var geometry = new THREE.SphereGeometry( 5, 32, 32 );
	var material = new THREE.MeshBasicMaterial( {map: sunTexture} );
	var sun = new THREE.Mesh( geometry, material );

	var spriteMaterial = new THREE.SpriteMaterial( 
	{ 
		map: new textureLoader( 'assets/img/textures/glow.png' ),
		color: 0xF9DB64, transparent: false, blending: THREE.AdditiveBlending
	});
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(15, 15, 1.0);
	sun.add(sprite);
	scene.add( sun );

	//EARTH
	var geometry = new THREE.SphereGeometry( 2.8, 32, 32 );

	var earthTexture = textureLoader.load("assets/img/textures/earth.jpg");
	var earthBumpMap = textureLoader.load('assets/img/textures/earthbump.jpg');
	var earthSpecularMap = textureLoader.load('assets/img/textures/earthspec.jpg');
	var material = new THREE.MeshPhongMaterial( {map: earthTexture, bumpMap: earthBumpMap, specularMap: earthSpecularMap} );
	material.bumpScale = 0.05;
	material.specular  = new THREE.Color('grey');

	var earth = new THREE.Mesh( geometry, material );
	earth.castShadow = true;
	earth.receiveShadow = true;
	scene.add( earth );

	var earthPivot = new THREE.Object3D();
	scene.add(earthPivot);
	earthPivot.add(earth);

	//MOON
	var geometry = new THREE.SphereGeometry( 0.6, 20, 20 );
	var moonTexture = textureLoader.load("assets/img/textures/moonmap.jpg");
	var moonBumpMap = textureLoader.load('assets/img/textures/moonbump.jpg');
	var material = new THREE.MeshLambertMaterial( {map: moonTexture, bumpMap: moonBumpMap} );
	material.bumpScale = 0.05;
	var moon = new THREE.Mesh( geometry, material );
	moon.castShadow = true;
	moon.receiveShadow = true;
	var moonPivot = new THREE.Object3D();
	moonPivot.add(moon);
	earth.add(moonPivot);

	//VENUS
	var geometry = new THREE.SphereGeometry( 2, 32, 32 );
	var venusTexture = textureLoader.load("assets/img/textures/venusmap.jpg");
	var material = new THREE.MeshLambertMaterial( {map: venusTexture} );
	material.bumpScale = 0.05;
	var venus = new THREE.Mesh( geometry, material );
	venus.castShadow = true;
	venus.receiveShadow = true;
	scene.add( venus );

	var venusPivot = new THREE.Object3D();
	scene.add(venusPivot);
	venusPivot.add(venus);


	//JUPITER
	var geometry = new THREE.SphereGeometry( 4.2, 32, 32 );
	var jupiterTexture = textureLoader.load("assets/img/textures/texture3.png");
	var material = new THREE.MeshLambertMaterial( {map: jupiterTexture} );
	var jupiter = new THREE.Mesh( geometry, material );
	jupiter.castShadow = true;
	jupiter.receiveShadow = true;
	scene.add( jupiter );

	var jupiterPivot = new THREE.Object3D();
	scene.add(jupiterPivot);
	jupiterPivot.add(jupiter);



	//LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x101010 );
	scene.add(ambientLight);
	var sunLight = new THREE.PointLight( 0xffffcc, 1, 100, 2);
	sunLight.castShadow = true;
	sunLight.position.set(0, 0, 0);
	scene.add( sunLight );

	//SKYBOX
	createSkybox();

	/*//SNIPER
	var colladaLoader = new THREE.ColladaLoader();
	var sniper;
	colladaLoader.load('assets/models/sniper.dae', function(collada) {
		sniper = collada.scene;
		sniper.position.y = 15;
		sniper.rotation.x = -1 * Math.PI / 2;
		scene.add(sniper);
	}, 
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	});*/


	return {
		sun: sun,
		earth: earth,
		moon: moon,
		venus: venus,
		jupiter: jupiter,

		earthPivot: earthPivot,
		moonPivot: moonPivot,
		venusPivot: venusPivot,
		jupiterPivot: jupiterPivot
	};
}

function alterObjects(objects) {
	//starting positions
	objects.earth.position.x = 22;
	objects.venus.position.x = 14;
	objects.jupiter.position.x = 35;
	objects.moon.position.x = 5;

	objects.earthPivot.rotation.y = Math.random() * 2 * Math.PI;
	objects.venusPivot.rotation.y = Math.random() * 2 * Math.PI;
	objects.jupiterPivot.rotation.y = Math.random() * 2 * Math.PI;
}

function createSkybox() {
	var skyboxUrl = "assets/img/skybox/";
	var urls = [skyboxUrl + "Left.jpg", skyboxUrl + "Right.jpg", skyboxUrl + "Up.jpg", skyboxUrl + "Down.jpg", skyboxUrl + "Front.jpg", skyboxUrl + "Back.jpg"];
	
	
	var materialsArray = [];
	for (var k in urls) {
		var url = urls[k];
		materialsArray.push(new THREE.MeshBasicMaterial({map: textureLoader.load(url), side: THREE.BackSide}));
	}
	skyboxMesh = new THREE.Mesh(new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1), materialsArray);
	scene.add(skyboxMesh);
}

function render(objects) {
	function animate() {
		requestAnimationFrame(animate);

		objects.sun.rotation.y += params.sunRotSpeedy;
		objects.earth.rotation.y += params.earthRotSpeedY;
		objects.venus.rotation.y += params.venusRotSpeedY;
		objects.jupiter.rotation.y += params.jupiterRotSpeedY;

		objects.earthPivot.rotation.y += params.earthOrbitSpeed;
		objects.venusPivot.rotation.y += params.venusOrbitSpeed;
		objects.jupiterPivot.rotation.y += params.jupiterOrbitSpeed;
		objects.moonPivot.rotation.y += params.moonOrbitSpeedy;
		objects.moonPivot.rotation.x += params.moonOrbitSpeedx;

		TWEEN.update();
		
		renderer.render(scene, camera);
	}
	animate();
}

/**
 * Listeners
 */
function addListeners() {
	document.body.addEventListener( 'mousewheel', cameraZoom, false );
	document.body.addEventListener( 'DOMMouseScroll', cameraZoom, false ); // firefox

	document.body.addEventListener('mousedown', onMouseDown, false);
	document.body.addEventListener('mousemove', onMouseDrag, false);
	document.body.addEventListener('mouseup', onMouseUp, false);
}

function cameraZoom(event) {
	var target;
	var position = camera.position.z;

	// zoom out
    if(event.wheelDelta > 0) {
        if(camera.position.z < 1000) {
        	target = position - 5;
        }
	}
	else if (event.wheelDelta < 0) {
		if (camera.position.z > 0.1) {
			target = position + 5;
	    }
	}
	cameraTween = new TWEEN.Tween(camera.position)
                .to({ z: target} , 300)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
}

function onMouseDrag(event) {
	if (mousedown) {
		var moveX = event.movementX / 10 * -1;
		var moveY = event.movementY / 10;
		camera.position.x += moveX;
	    camera.position.y += moveY;
	}
}

function onMouseDown(event) {
	mousedown = true;
}
function onMouseUp() {
	mousedown = false;
}



