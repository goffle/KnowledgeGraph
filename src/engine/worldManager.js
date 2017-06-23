import cameraController from './camera/cameraController';
import mouseEvents from './events/MouseEvents';

class WorldManager {

  constructor(options) {
    console.log('Create WorldManager');

    this.container = '';

    // Set some camera attributes
    const VIEWANGLE = 45;
    const WIDTH = 800;
    const HEIGHT = 600;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(WIDTH, HEIGHT);
    this.scene = new THREE.Scene();

    // Add Camera
    this.camera = new THREE.PerspectiveCamera(VIEWANGLE, ASPECT, NEAR, FAR);
    this.camera.position.set(0, 1000, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.updateProjectionMatrix();
    this.scene.add(this.camera);
    this.mouseEvents = new mouseEvents();
    this.cameraController = new cameraController();

    this._entitiesGroup = new THREE.Object3D();
    this.scene.add(this._entitiesGroup);

    this._linksGroup = new THREE.Object3D();
    this.scene.add(this._linksGroup);

    this._entitiesInScene = [];

  }

  init(options) {
    // Add scene into element
    this.container = $(options.container);
    this.container.append(this.renderer.domElement);

    // init Mouse Controllers
    this.mouseEvents.init(this.camera, this.renderer, this._entitiesGroup);
    this.cameraController.init(this.camera, this.renderer, this.scene);

    this._createScene();

  }

  getCamera() { return this.camera; }

  getRenderer() { return this.renderer; }

  addToScene(obj) { this._entitiesGroup.add(obj); }

  removeFromScene(obj) { this._entitiesGroup.remove(obj); }

  addLinkMeshToScene(mesh) { this._linksGroup.add(mesh); };
  removeAllLinksMeshs() {
    while (this._linksGroup.children.length > 0) {
      this._linksGroup.remove(this._linksGroup.children[0]);
    }
  }

  getEntitiesInScene() { return this._entitiesInScene; }

  addEntityInScene(entity) {
    var entities = [].concat(entity);

    entities.forEach(currentEntity => {
      if (!this.isEntityInScene(currentEntity)) {
        this._entitiesInScene.push(currentEntity);
        this._entitiesGroup.add(currentEntity.getMesh());
      }
    });
  }

  isEntityInScene(entity) { return this._entitiesInScene.includes(entity); }

  removeEntityFromScene(entity) {
    var entities = [].concat(entity);

    entities.forEach(currentEntity => {
      var index = this._entitiesInScene.indexOf(currentEntity);

      if (index > -1) {
        this._entitiesInScene.splice(index, 1);
        this._entitiesGroup.remove(currentEntity.getMesh());
      }
    });
  }

  run() { this._animate(); }

  _createScene() {
    let pointLight = new THREE.PointLight(0xFFFFFF);

    pointLight.position.set(1000, 1000, 0);
    this.scene.add(pointLight);
  }

  _animate() {
    requestAnimationFrame(this._animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.cameraController.getControls().update();
    TWEEN.update();
  }
}

const sc = new WorldManager();

export default sc;
