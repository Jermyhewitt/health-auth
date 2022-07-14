import Model from './model';
export default class RegionModel extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'region';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', ],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string'},
      }
    };
  }
}