import worldManager from './engine/worldManager';
import events from './engine/events/events';
import dataManager from './data/dataManager';
import * as repart from './engine/repart';

module.exports = class knowledgeGraph {
  constructor(options) {
    this._version = __VERSION__;
    console.log('Run ' + this._version);
    this.worldManager = worldManager;
    this.dataManager = dataManager;
    this.events = events;

    worldManager.init(options);
    dataManager.init(options);

    worldManager.run();
  }

  getVersion() {
    return this._version;
  }

  select(name) {
    let entity = dataManager.getEntity(name);

    if (!entity) { console.warn('Can\'t find ' + name); return; }
    repart.select(entity);
    worldManager.cameraController.centerOn(entity.getMesh());
  }
};
