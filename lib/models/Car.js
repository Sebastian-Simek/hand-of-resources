const pool = require('../utils/pool');


class Car {
  id;
  name;
  manufacturer;
  country;
  year;

  constructor (row) {
    this.id = row.id;
    this.name = row.name;
    this.manufacturer = row.manufacturer;
    this.country = row.country;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM cars'
    );
    return rows.map((row) => new Car(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM cars
          WHERE cars.id = $1
          GROUP BY cars.id`, [id]
    );
    return new Car(rows[0]);
  }

  static async insert({ name, manufacturer, country, year }) {
    const { rows } = await pool.query(
      `INSERT INTO cars 
        (name, manufacturer, country, year)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [name, manufacturer, country, year] 
    );
    return new Car(rows[0]);
  }
}




module.exports = { Car };
