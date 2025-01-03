const divmod = (a, b) => [Math.floor(a / b), a % b];

export class Clock {
  constructor(hours, minutes = 0) {
    let addedHours = 0;

    if (minutes < 0) {
      addedHours = -1 - Math.floor(Math.abs(minutes) / 60);
      minutes = 60 - Math.abs(minutes) % 60;
      hours += addedHours;
    }

    if (hours < 0) {
      hours = 24 - Math.abs(hours) % 24;
    }

    if (hours >= 24) {
      hours = hours % 24;
    }

    [addedHours, this.minutes] = divmod(minutes, 60);
    this.hours = hours + addedHours % 24;
  }

  toString() {
    return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;
  }

  plus(minutes) {
    let addedMinutes = this.minutes + minutes;
    const [addedHours, newMinutes] = divmod(addedMinutes, 60);

    this.hours = (this.hours + addedHours) % 24
    this.minutes = newMinutes;

    return this
  }

  minus(minutes) {
    const [addedHours, newMinutes] = divmod(this.minutes - minutes, 60);

    this.hours = (24 + this.hours + addedHours) % 24;
    this.minutes = (60 + newMinutes) % 60;

    return this;
  }

  equals(other) {
    return this.hours === other.hours && this.minutes === other.minutes;
  }
}
