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
}

module.exports = { Fruit };
