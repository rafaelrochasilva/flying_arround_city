window.app = window.app || {};

(function(app) {
  function City() {
  }
  
  var fn = City.prototype;

  fn.createFloor = function() {
    var planeGeometry = new THREE.PlaneGeometry(2000, 2000, 20, 20),
        planeBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x9db3b5, overdraw: true }),
        floor = new THREE.Mesh(planeGeometry, planeBasicMaterial);

    floor.rotation.x = -90 * Math.PI / 180;
    
    return floor;
  };

  fn.createLight = function() {
    var light = new THREE.DirectionalLight(0xf6e86d, 1);
    light.position.set(1, 3, 2);

    return light;
  };

  fn.createBuildings = function() {
    var buildGeometry = new THREE.CubeGeometry(1, 1, 1),
        matrixTranslation = new THREE.Matrix4().makeTranslation(0, 0.5, 0),
        buildMaterial = new THREE.MeshPhongMaterial({ overdraw: true, color: 0xccc }),
        buildingsGeometry = new THREE.Geometry();

    buildGeometry.applyMatrix(matrixTranslation);

    for (var i = 0; i < 300; i++) {
      var building = new THREE.Mesh(buildGeometry.clone());

      building.position.x = Math.floor(Math.random() * 200 - 100) * 4;
      building.position.z = Math.floor(Math.random() * 200 - 100) * 4;

      building.scale.x = Math.random() * 50 + 10;
      building.scale.y = Math.random() * building.scale.x * 8 + 8;
      building.scale.z = building.scale.x;

      THREE.GeometryUtils.merge(buildingsGeometry, building);
    }

    return new THREE.Mesh(buildingsGeometry, buildMaterial);
  };
  
  app.City = City;
})(window.app);
