var camera, scene, renderer;
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var controls, clock;

function setup() {
	document.body.style.backgroundColor = "#d7f0f7";

	setupThreeJS();
	setupWorld();

	requestAnimationFrame(function animate() {
		renderer.render(scene, camera);
		controls.update(clock.getDelta());
		requestAnimationFrame(animate);
	});

	window.addEventListener('resize', function() {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });
}

function setupThreeJS(){
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
	camera.position.y = 400;
	camera.position.z = 400;
	camera.rotation.x = -45 * Math.PI / 180;

	// renderer = new THREE.CanvasRenderer();
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);


	clock = new THREE.Clock();
	controls = new THREE.FirstPersonControls(camera);
	controls.movementSpeed = 100;
	controls.lookSpeed = 0.1;
}

function setupWorld(){
	// Floor
	var geo = new THREE.PlaneGeometry(2000, 2000, 20, 20);
	var mat = new THREE.MeshBasicMaterial({color: 0x9db3b5, overdraw: true});
	var floor = new THREE.Mesh(geo, mat);
	floor.rotation.x = -90 * Math.PI/180;
	scene.add(floor);

	// Original building
	var geometry = new THREE.CubeGeometry(1, 1, 1);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

	var material = new THREE.MeshPhongMaterial({overdraw: true, color: 0xcccccc});
	var light = new THREE.DirectionalLight(0xf6e86d, 1);
	light.position.set(1,3,2);
	scene.add(light);

	scene.fog = new THREE.FogExp2(0x9db3b5, 0.002);

	var cityGeometry = new THREE.Geometry();
	// Clone buildings
	for (var i = 0; i < 300; i++) {
		var building = new THREE.Mesh(geometry.clone());
		building.position.x = Math.floor(Math.random() * 200 - 100) * 4;
		building.position.z = Math.floor(Math.random() * 200 - 100) * 4;
		building.scale.x = Math.random() * 50 + 10;
		building.scale.y = Math.random() * building.scale.x * 8 + 8;
		building.scale.z = building.scale.x;
		THREE.GeometryUtils.merge(cityGeometry, building);
	}
	var city = new THREE.Mesh(cityGeometry, material);
	scene.add(city);
}