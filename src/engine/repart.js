import worldManager from './worldManager';

import * as meshUtils from './utils/meshUtils';
import * as textUtils from './utils/textUtils';

export function select(selectedEntity) {

  const connectedEntities = selectedEntity.getLinks().map(ent => { return ent.getToEntity(); });
  const entitiesInScene = worldManager.getEntitiesInScene();

  const entitiesToAddToScene = connectedEntities.filter(entity => {
    return !entitiesInScene.includes(entity);
  });
  const entitiesToRemoveFromScene = entitiesInScene.filter(entity => {
    return (!connectedEntities.includes(entity) && entity !== selectedEntity);
  });

  // add current to scene
  if (!worldManager.isEntityInScene(selectedEntity)) {
    worldManager.addEntityInScene(selectedEntity);
    selectedEntity.setPosition(0, 0, 0);
  }

  worldManager.removeEntityFromScene(entitiesToRemoveFromScene);
  worldManager.addEntityInScene(entitiesToAddToScene);
  worldManager.removeAllLinksMeshs();

  // TODO : To be adjust dynamically later
  const radius = 70;
  const portionAngle = (2 * Math.PI) / connectedEntities.length;

  selectedEntity.getLinks().reduce((accAngle, link) => {

    accAngle += portionAngle;
    let newX = (selectedEntity.getPosition().x + radius * Math.cos(accAngle));
    let newZ = (selectedEntity.getPosition().z + radius * Math.sin(accAngle));

    link.getToEntity().setPosition(newX, 0, newZ);

    setTimeout(() => {
      worldManager.addLinkMeshToScene(
        meshUtils.createLine(
          selectedEntity.getPosition().x,
          selectedEntity.getPosition().y,
          selectedEntity.getPosition().z,
          newX,
          0,
          newZ));

      const textPosition = new THREE.Vector3(
        (selectedEntity.getPosition().x + newX) / 2,
        0,
        (selectedEntity.getPosition().z + newZ) / 2);

      worldManager.addLinkMeshToScene(
        textUtils.createTextSprite(link.getType(), textPosition,
          {
            fontsize: 48,
            borderColor: { r: 255, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 255, g: 255, b: 255, a: 1 }
          }));

    }, 800);

    return accAngle;
  }, 0);

}
