import DOMHandler from "./dom.js";
import Store from "./store.js";

export default class Adapter {
  constructor() {
    this.__dom = new DOMHandler();
    this.__store = new Store("events");
  }

  createEventOrUpdateIfExisted(upcomingEvent, eventRemainingTime) {
    this.__store.set(upcomingEvent);
    this.__dom.update(eventRemainingTime);
  }

  removeEvent(title) {
    this.__store.remove(title);
    this.__dom.removeEventElement(title);
  }

  getStoredEvents() {
    return this.__store.get();
  }

  showError(msg) {
    this.__dom.renderErrorMsg(msg);
  }
}
