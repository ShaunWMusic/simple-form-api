'use strict';

const Env = use('Env');
const Helpers = use('Helpers');
const fs = require('file-system');

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'mysql'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath('development.sqlite'),
    },
    useNullAsDefault: true,
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath('testing.sqlite'),
    },
    useNullAsDefault: true,
  },

  /*
  |--------------------------------------------------------------------------
  | Mysql
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for Mysql database.
  |
  | npm i --save mysql
  |
  */
// var ca = {key : fs.readFileSync('config' + '/client-key.pem'), cert : fs.readFileSync('config' + '/client-cert.pem'), ca : fs.readFileSync('config' + '/server-ca.pem')};

  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST'),
      user: Env.get('DB_USER'),
      password: Env.get('DB_PASSWORD'),
      database: Env.get('DB_DATABASE'),
      // debug: true,
      ssl  : {
        key : fs.readFileSync('client-key.pem'),
        cert : fs.readFileSync('client-cert.pem'),
        ca : fs.readFileSync('server-ca.pem')
        // key : Env.get('SSL_CLIENT_KEY'),
        // cert : Env.get('SSL_CERT'),
        // ca : Env.get('SSL_SERVER_CA')
      }
    },
  },

  /*
  |--------------------------------------------------------------------------
  | MSSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for Mysql database.
  |
  | npm i --save mssql
  |
  */
  mssql: {
    client: 'mssql',
    connection: {
      host: Env.get('MSQL_DB_HOST'),
      port: Env.get('MSQL_PORT'),
      user: Env.get('MSQL_DB_USER'),
      password: Env.get('MSQL_DB_PASSWORD'),
      database: Env.get('MSQL_DB_DATABASE')
    },
  },


  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for Mysql database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: Env.get('DATABASE_URL', {
      host: Env.get('DB_HOST', 'localhost'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis'),
    }),
  },

};
