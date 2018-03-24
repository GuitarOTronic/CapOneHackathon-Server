// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/co_de'
  }
  // {
  //   client: 'pg',
  //   connection: 'postgres://localhost:5432/industry_dev',
  //   migrations: {
  //    directory: path.join(__dirname, 'db', 'migrations')
  //  },
  //  seeds: {
  //    directory: path.join(__dirname, 'db', 'seeds')
  //  }
  // }
  ,
  staging: {
    client: 'postgresql',
    connection: {
      database: 'co_de',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'co_de',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
