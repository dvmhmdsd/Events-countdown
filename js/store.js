export default class Store {
  constructor(key) {
    this.__key = key;
  }

  get() {
    let eventsList = localStorage.getItem(this.__key);
    return JSON.parse(eventsList) || [];
  }

  set(item) {
    if (this.isEventExisted(item)) {
      return;
    } else {
      let events = this.get();
      events.push(item);
      localStorage.setItem(this.__key, JSON.stringify(events));
    }
  }

  remove(title) {
    let events = this.get();
    let newEventsArray = events.filter((event) => event.title !== title);
    localStorage.setItem(this.__key, JSON.stringify(newEventsArray));
  }

  isEventExisted(event) {
    let events = this.get(),
      existedEvent = events.find((item) => item.title === event.title);

    if (existedEvent) {
      return true;
    }
    return false;
  }

  update(item) {
    let events = this.get(),
      { title } = item;

    events.map((event) => {
      if (event.title === title) {
        event = item;
      }
    });
    localStorage.setItem(this.__key, JSON.stringify(events));
  }
}
