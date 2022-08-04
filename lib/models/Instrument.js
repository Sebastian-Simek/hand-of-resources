const pool = require('../utils/pool');

class Instrument {
  id;
  category;
  range;
  name;

  constructor(row) {
    this.id = row.id;
    this.category = row.category;
    this.name = row.name;
    this.range = row.range;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM instruments'
    );
    return rows.map((row) => new Instrument(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM instruments
       WHERE instruments.id = $1
       GROUP BY instruments.id`, [id]
    );
    console.log(rows);
    return new Instrument(rows[0]);
  }
}

module.exports = { Instrument };
