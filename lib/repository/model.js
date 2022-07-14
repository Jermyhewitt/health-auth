import { Model } from 'objection';
import knex from 'knex';

// Initialize knex.
const knexCon = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: 'health.db'
  }
});

// Give the knex instance to objection.
Model.knex(knexCon);

export default Model;