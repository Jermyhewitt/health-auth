import Model from './model';
export default class UserModel extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'user';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string'},
        password: { type: 'string'},
      }
    };
  }
}