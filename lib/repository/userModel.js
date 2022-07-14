import Model from './model';
import RegionModel from './regionModel';
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
      required: ['userName', 'password','regionId'],

      properties: {
        id: { type: 'integer' },
        userName: { type: 'string'},
        password: { type: 'string'},
        regionId: { type: 'integer'},
        profilePic: { type: 'string'},
      }
    };
  }

  static get relationMappings() {
    return {
      region: {
        relation: Model.BelongsToOneRelation,
        modelClass: RegionModel,
        join: {
          from: 'user.regionId',
          to: 'region.id'
        }
      }
    }
    

  }
}