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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM dogs
        WHERE dogs.id = $1
        GROUP BY dogs.id`, [id]
    );
    return new Dog(rows[0]);
  }

  static async insert(newDog) {
    const { rows } = await pool.query(
      `INSERT INTO dogs (name, type, age)
        VALUES ($1, $2, $3)
        RETURNING*`,
      [newDog.name, newDog.type, newDog.age]
    );
    return new Dog(rows[0]);
  }

  static async updateById(id, newAttribute) {
    const dog = await Dog.getById(id);
    if (!dog) return null;
    const updatedDog = { ...dog, ...newAttribute };
    const { rows } = await pool.query(
      `UPDATE dogs
        SET name = $2, type = $3, age = $4
        WHERE id = $1
        RETURNING *`,
      [
        id,
        updatedDog.name,
        updatedDog.type,
        updatedDog.age
      ]
    );
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
