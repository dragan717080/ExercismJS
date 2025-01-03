export class ArgumentError extends Error {}

export class OverheatingError extends Error {
  constructor(temperature) {
    super(`The temperature is ${temperature} ! Overheating !`);
    this.temperature = temperature;
  }
}

/**
 * Check if the humidity level is not too high.
 *
 * @param {number} humidityPercentage
 * @throws {Error}
 */
export const checkHumidityLevel = (humidityPercentage) => {
  if (humidityPercentage > 70) {
    throw new OverheatingError(humidityPercentage);
  }
}

/**
 * Check if the temperature is not too high.
 *
 * @param {number|null} temperature
 * @throws {ArgumentError|OverheatingError}
 */
export const reportOverheating = (temperature) => {
  if (temperature === null) {
    throw new ArgumentError('Temperature is null');
  } else if (temperature > 500) {
    throw new OverheatingError(temperature);
  }
}

/**
 *  Triggers the needed action depending on the result of the machine check.
 *
 * @param {{
 * check: function,
 * alertDeadSensor: function,
 * alertOverheating: function,
 * shutdown: function
 * }} actions
 * @throws {ArgumentError|OverheatingError|Error}
 */
export const monitorTheMachine = (actions) => {
  const { check, alertDeadSensor, alertOverheating, shutdown } = actions;
  try {
    check();
  } catch(err) {
    if (err instanceof ArgumentError) {
      alertDeadSensor();
    } else if (err instanceof OverheatingError) {
      const temperature = err.toString().split('!')[0].trim().split(' ').slice(-1)[0];
      temperature < 601 ? alertOverheating() : shutdown();
    } else {
      throw err;
    }
  }
}
