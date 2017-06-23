import signals from 'signals';

/* var myObject = {
  started : new signals.Signal()
};
function onStarted(param1, param2){
  alert(param1 + param2);
}
myObject.started.add(onStarted); //add listener
myObject.started.dispatch('foo', 'bar'); //dispatch signal passing custom parameters
myObject.started.remove(onStarted); //remove a single list*/

class Events {
  constructor() {
    this._map = new Map();
  }

  initEvent(eventName) {
    console.log('add event ' + eventName);
    this._map.set(eventName, new signals.Signal());
  }

  addListener(eventName, cb) {
    let event = this._map.get(eventName);

    if (!event) { console.warn(`There is no event ${eventName}`); return; }
    event.add(cb);
  }

  removeListener(eventName, cb) {
    console.log('TODO');
  }

  emitEvent(eventName, parameters) {
    let event = this._map.get(eventName);

    if (!event) { console.warn(`There is no event ${eventName}`); return; }
    event.dispatch(parameters);
  }
}

const ev = new Events();

export default ev;
