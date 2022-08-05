const pool = require('../utils/pool');

class Cat {
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
      'SELECT * FROM cats'
    );
    console.log(rows);
    return rows.map((row) => new Cat(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM cats
        WHERE cats.id = $1
        GROUP BY cats.id`, [id]
    );
    return new Cat(rows[0]);
  }

  static async insert(newCat) {
    const { rows } = await pool.query(
      `INSERT INTO cats (name, type, age)
        VALUES ($1, $2, $3)
        RETURNING*`,
      [newCat.name, newCat.type, newCat.age]
    );
    return new Cat(rows[0]);
  }

  static async updateById(id, newAttribute) {
    const cat = await Cat.getById(id);
    if (!Cat) return null;
    const updatedCat = { ...cat, ...newAttribute };
    const { rows } = await pool.query(
      `UPDATE cats
        SET name = $2, type = $3, age = $4
        WHERE id = $1
        RETURNING *`,
      [
        id,
        updatedCat.name,
        updatedCat.type,
        updatedCat.age
      ]
    );
    return new Cat(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM cats
        WHERE id = $1
        RETURNING *`, [id]
    );
    new Cat(rows[0]);
  }
}

module.exports = { Cat };
