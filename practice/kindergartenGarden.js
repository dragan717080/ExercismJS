const DEFAULT_STUDENTS = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
];

const PLANT_CODES = { G: 'grass', V: 'violets', R: 'radishes', C: 'clover' };

export class Garden {
  /**
   * @param {string} diagram
   * @param {Array<string>} students
   */
  constructor(diagram, students = DEFAULT_STUDENTS) {
    this.diagram = diagram.split('\n');
    students.sort();
    this.students = students;
  }

  /**
   * @param {string} student
   * @returns {Array<string>}
   */
  plants(student) {
    const startIndex = 2 * this.students.indexOf(student);
    const allPlants = this.diagram[0].slice(startIndex, startIndex + 2) + this.diagram[1].slice(startIndex, startIndex + 2)

    return [...allPlants].map(c => PLANT_CODES[c]);
  }
}
