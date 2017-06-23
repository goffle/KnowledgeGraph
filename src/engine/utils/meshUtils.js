
export function createBoxMesh(image, size, position) {
  const texloader = new THREE.TextureLoader();
  let ObjectTexture = texloader.load(image);
  let cubeGeometry = new THREE.CubeGeometry(size, 5, size);
  // TODO var maxAnisotropy = renderer.getMaxAnisotropy();
  const maxAnisotropy = 16;

  ObjectTexture.anisotropy = maxAnisotropy;

  let mesh = new THREE.Mesh(cubeGeometry.clone(), new THREE.MeshBasicMaterial(new THREE.MeshBasicMaterial({ map: ObjectTexture })));

  return mesh;
}

export function createSphereMesh(image, size, position) {

  const texloader = new THREE.TextureLoader();
  let spacetex = texloader.load(image);
  let MainMaterial = new THREE.MeshBasicMaterial({ map: spacetex, color: 0xffffff, transparent: true });
  let mainGeometry = new THREE.CylinderGeometry(20, 20, 3, 30, 40);
  let mesh = new THREE.Mesh(mainGeometry, MainMaterial);

  return mesh;
}

export function createLine(fromPositionx, fromPositiony, fromPositionz, toPositionx, toPositiony, toPositionz, color = 0xffffff) {
  let lineGeometry = new THREE.Geometry();
  let vertArray = lineGeometry.vertices;

  vertArray.push(new THREE.Vector3(fromPositionx, fromPositiony, fromPositionz), new THREE.Vector3(toPositionx, toPositiony, toPositionz));
  lineGeometry.computeLineDistances();

  let lineMaterial = new THREE.LineBasicMaterial({ color: color });
  let line = new THREE.Line(lineGeometry, lineMaterial);

  return line;
}
