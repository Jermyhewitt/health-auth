/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {

    knex.schema.hasTable('user').then(function(exists) {
        if (!exists) {
            return knex.schema
            .createTable('user', function (table) {
                table.increments('id');
                table.string('userName');
                table.string('password');
                table.integer('regionId');
                table.foreign('regionId').references('id').inTable('region')
            });
        }
      });
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema
    .dropTable("user")
    
};
