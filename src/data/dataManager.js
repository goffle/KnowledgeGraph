import Entity from './entity';
import EntityLink from './entityLink';

class DataManager {
  constructor() {
    this._map = new Map();
    console.log('Create DataManager');
  }

  addEntity(entity) { this._map.set(entity.getName(), entity); }

  getEntity(name) { return this._map.get(name); }
  getEntities() { return this._map; }

  load(object, cb) {
    object.data.forEach((ent) => {
      let newEntity = new Entity(ent.name, ent.icon);

      this.addEntity(newEntity);
    });

    object.links.forEach((link) => {
      let entityFrom = this.getEntity(link.from);
      let entityTo = this.getEntity(link.to);

      if (entityTo && entityFrom) {
        let newLink = new EntityLink(entityFrom, entityTo, link.link);

        entityFrom.addLink(newLink);
      }

      if (!entityFrom) {console.warn(`Link ${link.link} seems corrupted. Can't find ${link.from} `);}
      if (!entityTo) {console.warn(`Link ${link.link} seems corrupted. Can't find ${link.to} `);}
    });
    cb();
  }

  init() { }

}

const dm = new DataManager();

export default dm;
