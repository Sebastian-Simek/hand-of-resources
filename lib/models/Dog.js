const pool = require('../utils/pool');

class Dog {
  id;
  name;
  type;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.age = row.age;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM dogs'
    );
    return rows.map((row) => new Dog(row));
  }

}

module.exports = { Dog };
