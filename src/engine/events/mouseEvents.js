import events from './events';

var raycaster = new THREE.Raycaster();

export default class MouseEvents {

  constructor() {
    this._mouse = null;

    this._camera = null;
    this._renderer = null;
    this._sceneGroup = null;

    this._selectedObjects = [];

    events.initEvent('EntityClicked');
    events.initEvent('EntityHoverOn');
    events.initEvent('EntityHoverOff');
  }

  init(camera, renderer, sceneGroup) {

    this._camera = camera;
    this._renderer = renderer;
    this._sceneGroup = sceneGroup;
    this._mouse = new THREE.Vector2();

    document.addEventListener('mousedown', this._onDocumentMouseDown.bind(this), false);
    document.addEventListener('mousemove', this._onDocumentMouseMove.bind(this), false);
  }

  _getEntity(event) {

    // update the mouse variable
    this._mouse.x = (event.clientX / this._renderer.domElement.clientWidth) * 2 - 1;
    this._mouse.y = -(event.clientY / this._renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(this._mouse, this._camera);
    let intersects = raycaster.intersectObjects(this._sceneGroup.children);

    if (intersects.length > 0) { return intersects[0].object.userData.entity; }

    return null;
  }

  _onDocumentMouseDown(event) {
    let entity = this._getEntity(event);

    if (entity) {
      events.emitEvent('EntityClicked', entity);
    }
  }

  _onDocumentMouseMove(event) {
    let entity = this._getEntity(event);

    if (entity && !this._selectedObjects.includes(entity)) {
      events.emitEvent('EntityHoverOn', entity);
      this._selectedObjects.push(entity);
    } else if (!entity && this._selectedObjects.length) {
      this._selectedObjects.forEach((selectedEntity) => {
        events.emitEvent('EntityHoverOff', selectedEntity);
      });
      this._selectedObjects = [];
    }
  }
}
