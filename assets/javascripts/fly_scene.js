window.app = window.app || {};

(function(app) {
  function FlyScenario() {
    this.space = {
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight
    };

    this.camera = this.initCamera();
    this.controls = this.initControls(this.camera);
    this.renderer = this.initRenderer();
    this.scene = this.initScene();
    this.clock = this.initClock();

    this.bindEvents();
    this.run();
  }

  var fn = FlyScenario.prototype;

  fn.bindEvents = function() {
    window.addEventListener('resize', this.resize);
  };

  fn.initCamera = function() {
    var aspectRatio = this.space.WIDTH / this.space.HEIGHT,
        verticalFieldView = 75,
        nearPlane = 1,
        farPlane = 10000,
        camera = new THREE.PerspectiveCamera(verticalFieldView, aspectRatio, nearPlane, farPlane);

    camera.position.y = 400;
    camera.position.x = 400;
    camera.rotation.x = -45 * Math.PI / 180;

    return camera;
  };

  fn.initScene = function() {
    var city = new app.City();
        scene = new THREE.Scene();

    scene.add(city.createFloor());
    scene.add(city.createLight());
    scene.add(city.createBuildings());

    return scene;
  };

  fn.initControls = function(camera) {
    var controls = new THREE.FirstPersonControls(camera);

    controls.movementSpeed = 100;
    controls.lookSpeed = 0.1;

    return controls;
  };

  fn.initClock = function() {
    return new THREE.Clock();
  };

  fn.initRenderer = function() {
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.space.WIDTH, this.space.HEIGHT);

    return renderer;
  };

  fn.resize = function() {
    var width = window.innerWidth,
        height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  fn.run = function() {
    var self = this;

    document.body.appendChild(this.renderer.domElement);

    requestAnimationFrame(function animate() {
      self.renderer.render(self.scene, self.camera);
      self.controls.update(self.clock.getDelta());
      requestAnimationFrame(animate);
    });
  };

  app.FlyScenario = FlyScenario;
})(window.app);
