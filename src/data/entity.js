import * as meshUtils from '../engine/utils/meshUtils';

export default class Entity {
  constructor(name, image) {
    this._name = name;
    this._image = image;
    this._links = [];
    this._mesh = this._createMesh();
  }

  addLink(link) { this._links.push(link); }
  getName() { return this._name; }
  getImage() { return this._images; }
  getLinks() { return this._links; }
  getMesh() { return this._mesh; }

  getPosition() { return this._mesh.position; }

  setPosition(x, y, z) {

    let from = this._mesh.position;
    let to = { x: x, y: y, z: z };
    const animationDuration = 500;

    new TWEEN.Tween(from).to(to, animationDuration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        this._mesh.position.set(from.x, from.y, from.z);
      })
      .onComplete(() => {
      })
      .start();
  }

  setColor(color) { this._mesh.material.color.setHex(color); }

  _createMesh() {
    let mesh = meshUtils.createBoxMesh(this._image, 15, 0);

    mesh.name = 'Mesh_' + this._name;
    mesh.userData.entity = this;
    return mesh;
  }
}
