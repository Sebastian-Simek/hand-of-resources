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
    return new Instrument(rows[0]);
  }

  static async insert({ name, category, range }) {
    const { rows } = await pool.query(
      `INSERT INTO instruments (name, category, range)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [name, category, range]
    );
    return new Instrument(rows[0]);
  }

  static async updateById(id, newAttribute) {
    const instrument = await Instrument.getById(id);
    if (!instrument) return null;
    const updatedInstrument = { ...instrument, ...newAttribute };
    const { rows } = await pool.query(
      `UPDATE instruments
        SET name = $2, category = $3, range = $4
        WHERE id = $1
        RETURNING *;`,
      [
        id,
        updatedInstrument.name,
        updatedInstrument.category,
        updatedInstrument.range,
      ]
    );
    return new Instrument(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM instruments
        WHERE id = $1
        RETURNING *`, [id]
    );
    return new Instrument(rows[0]);
  }
}

module.exports = { Instrument };
