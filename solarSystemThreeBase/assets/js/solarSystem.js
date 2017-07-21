var scene, camera, renderer;
var params;
var mousedown = false;
var textureLoader;


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

	camera.position.z = 30;
	camera.position.y = 20;
	camera.rotation.x = -0.5;
}

function createObjects() {
	var parent = new THREE.Object3D();
	scene.add(parent);

	//SUN
	var geometry = new THREE.SphereGeometry( 5, 32, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xFFBC08} );
	var sun = new THREE.Mesh( geometry, material );
	scene.add( sun );

	//EARTH
	var geometry = new THREE.SphereGeometry( 2, 32, 32 );

	var material = new THREE.MeshLambertMaterial( {color: 0x2255cc} );
	material.bumpScale = 0.05;
	material.specular  = new THREE.Color('grey');

	var earth = new THREE.Mesh( geometry, material );
	earth.castShadow = true;
	earth.receiveShadow = true;
	scene.add( earth );

	var earthPivot = new THREE.Object3D();
	scene.add(earthPivot);
	earthPivot.add(earth);

	//URANUS
	var geometry = new THREE.SphereGeometry( 2.5, 32, 32 );
	var uranusTexture = textureLoader.load("assets/img/textures/oranges.jpg");
	var material = new THREE.MeshLambertMaterial( {color: 0xF34747} );
	var uranus = new THREE.Mesh( geometry, material );
	uranus.castShadow = true;
	uranus.receiveShadow = true;
	scene.add( uranus );

	var uranusPivot = new THREE.Object3D();
	scene.add(uranusPivot);
	uranusPivot.add(uranus);


	//JUPITER
	var geometry = new THREE.SphereGeometry( 4, 32, 32 );
	var material = new THREE.MeshLambertMaterial( {color: 0xC5DF34} );
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


	return {
		sun: sun,
		earth: earth,
		uranus: uranus,
		jupiter: jupiter,

		earthPivot: earthPivot,
		uranusPivot: uranusPivot,
		jupiterPivot: jupiterPivot
	};
}

function alterObjects(objects) {
	//starting positions
	objects.earth.position.x = 9;
	objects.uranus.position.x = 15;
	objects.jupiter.position.x = 25;
}

function createSkybox() {
	var skyboxUrl = "assets/img/skybox/";
	var urls = [skyboxUrl + "left.png", skyboxUrl + "right.png", skyboxUrl + "up.png", skyboxUrl + "down.png", skyboxUrl + "front.png", skyboxUrl + "back.png"];
	
	
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
		objects.uranus.rotation.y += params.uranusRotSpeedY;
		objects.jupiter.rotation.y += params.jupiterRotSpeedY;

		objects.earthPivot.rotation.y += params.earthOrbitSpeed;
		objects.uranusPivot.rotation.y += params.uranusOrbitSpeed;
		objects.jupiterPivot.rotation.y += params.jupiterOrbitSpeed;

		TWEEN.update();
		
		renderer.render(scene, camera);
	}
	animate();
}

function getParams() {
	return {
		sunRotSpeedy: 0.001,
		earthRotSpeedY: 0.01,
		uranusRotSpeedY: 0.008,
		jupiterRotSpeedY: 0.001,

		earthOrbitSpeed: 0.01,
		uranusOrbitSpeed: 0.005,
		jupiterOrbitSpeed: 0.001
	};
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
            //camera.position.z -= 5; 
        }
	}
	else if (event.wheelDelta < 0) {
		if (camera.position.z > 0.1) {
			target = position + 5;
	        //camera.position.z += 5;
	    }
	}
	cameraTween = new TWEEN.Tween(camera.position)
                .to({ z: target} , 500)
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



