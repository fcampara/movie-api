
require('../bootstrap')

const database = process.env.NODE_ENV === 'production' ? {
  use_env_variable: 'DATABASE_URL',
  dialect: process.env.DB_DIALECT || 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
} : {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}

module.exports = database
