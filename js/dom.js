export default class DOMHandler {
  update(event) {
    if (this.isEventExisted(event.title)) {
      this.updateExistingEvent(event);
    } else {
      this.createNewEvent(event);
    }
  }

  removeEventElement(title) {
    let event = this.getExistingEvent(title);
    if (event) event.remove();
  }

  createNewEvent(event) {
    let { title, days, hours, minutes, seconds } = event,
      $timersContainer = this.selectElements(".timers")[0],
      $timerCard = this.createElement({
        tagName: "article",
        className: "timer__card",
      }),
      $timerHeading = this.createElement({
        tagName: "h2",
        className: "card__title",
        content: title,
      }),
      $counterContainer = this.createElement({
        tagName: "section",
        className: "card__counter",
      }),
      $daysCounter = this.createElement({
        tagName: "span",
        className: "card__item counter__days",
        content: `${days} Days`,
      }),
      $hoursCounter = this.createElement({
        tagName: "span",
        className: "card__item counter__hours",
        content: `${hours} Hours`,
      }),
      $minutesCounter = this.createElement({
        tagName: "span",
        className: "card__item counter__minutes",
        content: `${minutes} Minutes`,
      }),
      $secondsCounter = this.createElement({
        tagName: "span",
        className: "card__item counter__seconds",
        content: `${seconds} Seconds`,
      });

    $counterContainer.append(
      $daysCounter,
      $hoursCounter,
      $minutesCounter,
      $secondsCounter
    );
    $timerCard.append($timerHeading, $counterContainer);
    $timersContainer.append($timerCard);
  }

  updateExistingEvent(eventObject) {
    let { days, hours, minutes, seconds, title } = eventObject,
      $event = this.getExistingEvent(title);

    $event.querySelector(".counter__days").textContent = `${days} Days`;
    $event.querySelector(".counter__hours").textContent = `${hours} Hours`;
    $event.querySelector(
      ".counter__minutes"
    ).textContent = `${minutes} Minutes`;
    $event.querySelector(
      ".counter__seconds"
    ).textContent = `${seconds} Seconds`;
  }

  createElement(item) {
    let { tagName, className, content } = item,
      $element = document.createElement(tagName);

    if (className) {
      $element.className = className;
    }
    if (content) {
      $element.innerHTML = content;
    }
    return $element;
  }

  renderErrorMsg(msg) {
    let $form = this.selectElements(".timer__form")[0],
      errorParagraph = {
        tagName: "p",
        className: "error-message",
        content: msg,
      },
      $errorParagraph = this.createElement(errorParagraph);

    $form.insertAdjacentElement("afterend", $errorParagraph);
    setTimeout(() => $errorParagraph.remove(), 2000);
  }

  getExistingEvent(title) {
    let eventTitles = this.selectElements(".card__title");

    for (
      let eventIndex = 0, titlesLength = eventTitles.length;
      eventIndex < titlesLength;
      eventIndex++
    ) {
      if (eventTitles[eventIndex].textContent === title) {
        return eventTitles[eventIndex].parentElement;
      }
    }
  }

  isEventExisted(title) {
    return !!this.getExistingEvent(title);
  }

  selectElements(query) {
    return document.querySelectorAll(query);
  }
}
