export class GradeSchool {
  constructor() {
    this.students = {};
  }

  /**
   * @returns {Record<number, Array<string>>}
   */
  roster() {
    const deepCopy = JSON.parse(JSON.stringify(this.students));
    return Object.freeze(
      Object.fromEntries(
        Object.entries(deepCopy)
          .sort(([grade1], [grade2]) => grade1 - grade2)
      )
    );
  }

  /**
   * @param {string} student
   * @param {number} grade
   */
  add(student, grade) {
    if (!this.students[grade]) {
      this.students[grade] = [];
    }

    for (const [grade, students] of Object.entries(this.students)) {
      if (students.includes(student)) {
        this.students[grade].splice(students.indexOf(student));
        continue;
      }
    }

    this.students[grade].push(student);
    this.students[grade].sort();
  }

  /**
   * @param {number} n
   * @returns {Array<string>}
   */
  grade(n) {
    return this.students[n] ? this.students[n].toSorted() : [];
  }
}
