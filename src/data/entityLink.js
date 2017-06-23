export default class EntityLink {
  constructor(fromEntity, toEntity, type) {
    this._fromEntity = fromEntity;
    this._toEntity = toEntity;
    this._type = type;
  }
  getToEntity() { return this._toEntity; }
  getFromEntity() { return this._fromEntity; }
  getType() { return this._type; }
}
