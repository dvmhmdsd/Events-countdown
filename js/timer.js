export default class Timer {
  FACTORS = {
    SEC: 1000,
    MIN: 60,
    HOUR: 60,
    DAY: 24,
  };

  tick(event) {
    let { date, title } = event;
    this.eventDate = new Date(date);

    if (this.differenceInSeconds <= 0) {
      return "Timed out";
    }
    return {
      title,
      seconds: this.getSeconds(this.differenceInSeconds),
      minutes: this.getMinutes(this.differenceInSeconds),
      hours: this.getHours(this.differenceInSeconds),
      days: this.getDays(this.differenceInSeconds),
    };
  }

  get differenceInSeconds() {
    return (this.eventDate - new Date()) / this.FACTORS.SEC;
  }

  getSeconds(seconds) {
    return Math.floor(seconds % this.FACTORS.MIN);
  }

  getMinutes(seconds) {
    return Math.floor(seconds / this.FACTORS.MIN) % this.FACTORS.HOUR;
  }

  getHours(seconds) {
    return Math.floor(
      (seconds / this.FACTORS.MIN / this.FACTORS.HOUR) % this.FACTORS.DAY
    );
  }

  getDays(seconds) {
    return Math.floor(
      seconds / this.FACTORS.MIN / this.FACTORS.HOUR / this.FACTORS.DAY
    );
  }
}
