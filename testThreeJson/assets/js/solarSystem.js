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

	controls = new THREE.OrbitControls( camera );

}

function createObjects() {
	var sun;
	var fox;

	/*var loader = new THREE.ObjectLoader();
    loader.load('./assets/fox.json', function(geometry) {
        //fox = new THREE.Mesh(geometry);
        scene.add(geometry);
    });*/

	//SUN
	var geometry = new THREE.SphereGeometry( 5, 32, 32 );
	var material = new THREE.MeshLambertMaterial( {color: 0xFDCD3B} );
	var sun = new THREE.Mesh( geometry, material );
	scene.add( sun );

	//LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x101010 );
	scene.add(ambientLight);
	var sunLight = new THREE.PointLight( 0xffffcc, 1, 100, 2);
	sunLight.castShadow = true;
	sunLight.position.set(0, 10, 0);
	scene.add( sunLight );


	return {
		sun: sun,
		fox: fox
	};
}

function alterObjects(objects) {
	
}

function createSkybox() {
	
}

function render(objects) {
	function animate() {
		requestAnimationFrame(animate);	

		controls.update();

		renderer.render(scene, camera);
	}
	animate();
}

function getParams() {
	return {
		
	};
}

/**
 * Listeners
 */
function addListeners() {
	/*document.body.addEventListener( 'mousewheel', cameraZoom, false );
	document.body.addEventListener( 'DOMMouseScroll', cameraZoom, false ); // firefox

	document.body.addEventListener('mousedown', onMouseDown, false);
	document.body.addEventListener('mousemove', onMouseDrag, false);
	document.body.addEventListener('mouseup', onMouseUp, false);*/
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



