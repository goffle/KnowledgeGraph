// https://github.com/AdactiveSAS/adsum-web-map/blob/master/src/engine/controllers/CameraController.js#L415

import OrbitControls from "./OrbitControls"


export default class CameraController {
  constructor() {
    console.log('Create CameraController');
    this._camera = null;
    this._controls = null;
  }

  init(camera, renderer, scene) {
    this._camera = camera;
    this._camera.position.set(0, 300, 0);
    this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    this._camera.updateProjectionMatrix();
    this._controls = new THREE.OrbitControls(this._camera, renderer.domElement);
  }

  getControls() { return this._controls; }

  // Center on an Object
  centerOn(selectedObject, zoom = 200) {

    const animationDuration = 600;
    let from = {
      positionx: this._camera.position.x,
      positiony: this._camera.position.y,
      positionz: this._camera.position.z,
      targetx: this._controls.center.x,
      targety: this._controls.center.y,
      targetz: this._controls.center.z
    };

    let to = {
      positionx: selectedObject.position.x,
      positiony: selectedObject.position.y + zoom,
      positionz: selectedObject.position.z,
      targetx: selectedObject.position.x,
      targety: selectedObject.position.y,
      targetz: selectedObject.position.z
    };

    new TWEEN.Tween(from).to(to, animationDuration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        this._camera.lookAt(from.targetx, from.targety, from.targetz);
        this._camera.position.set(from.positionx, from.positiony, from.positionz);
        this._controls.center.set(from.targetx, from.targety, from.targetz);

        this._camera.updateProjectionMatrix();
        this._controls.update();
      })
      .onComplete(() => {
        // this._camera.lookAt(to.positionx,to.positiony,to.positionz);
        // this._controls.center.set(to.targetx,to.targety,to.targetz);
      })
      .start();
  }
}
