import Timer from "./timer.js";
import Adapter from "./adapter.js";
import Validator from "./validator.js";

let $form = document.querySelector(".timer__form");

class Main {
  constructor() {
    this.__timer = new Timer();
    this.__adapter = new Adapter();
    this.__validator = new Validator();
  }

  parseForm(form) {
    let formData = {},
      formChildren = form.querySelectorAll("input");

    formChildren.forEach((field) => {
      if (field.type !== "submit") {
        formData[field.name] = field.value;
      }
    });
    return formData;
  }

  startEvent(submitEvent) {
    submitEvent.preventDefault();

    let formValues = this.parseForm($form),
      validationObject = this.__validator.validate(formValues.title);

    submitEvent.target.reset();

    if (!validationObject.status) {
      return this.__adapter.showError(validationObject.msg);
    } else if (formValues.date.length === 0) {
      return this.__adapter.showError("Date can't be empty !");
    }
    this.timerHandler(formValues);
  }

  renderEventsListFromStore() {
    let events = this.__adapter.getStoredEvents();

    events.forEach((event) => {
      this.timerHandler(event);
    });
  }

  timerHandler(values) {
    let interval = setInterval(() => {
      let timerValue = this.__timer.tick(values);
      if (timerValue === "Timed out") {
        alert(`${values.title} is out now !`);
        this.__adapter.removeEvent(values.title);
        clearInterval(interval);
      } else {
        this.__adapter.createEventOrUpdateIfExisted(values, timerValue);
      }
    }, 1000);
  }
}

let app = new Main();
$form.addEventListener("submit", (e) => app.startEvent(e));
window.addEventListener("DOMContentLoaded", () =>
  app.renderEventsListFromStore()
);
