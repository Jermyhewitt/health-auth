import Model from './model';
export default class ConfigModel extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'config';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['regionId', 'key','value'],

      properties: {
        id: { type: 'integer' },
        key:{ type: 'string'},
        value: { type: 'string'},
        regionId: { type: 'integer'},
      }
    };
  }
}