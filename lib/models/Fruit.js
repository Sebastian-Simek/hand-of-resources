const pool = require('../utils/pool');

class Fruit {
  id;
  name;
  type;
  is_healthy;

  constructor (row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.is_healthy = row.is_healthy;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM fruits'
    );
    return rows.map((row) => new Fruit(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM fruits
      WHERE fruits.id = $1
      GROUP BY fruits.id`, [id]
    );
    return new Fruit(rows[0]);
  }

  static async insert({ name, type, is_healthy }) {
    const { rows } = await pool.query(
      `INSERT INTO fruits (name, type, is_healthy)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [name, type, is_healthy]
    );
    return new Fruit(rows[0]);
  }

  static async updateById(id, newAttribute) {
    const fruit = await Fruit.getById(id);
    if (!fruit) return null;
    const updatedFruit = { ...fruit, ...newAttribute };
    const { rows } = await pool.query(
      `UPDATE fruits
        SET name = $2, type = $3, is_healthy = $4
        WHERE id = $1
        RETURNING *`,
      [
        id,
        updatedFruit.name,
        updatedFruit.type,
        updatedFruit.is_healthy,
      ]
    );
    return new Fruit(rows[0]);
  }
}

module.exports = { Fruit };
