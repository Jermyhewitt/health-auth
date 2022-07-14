/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    knex.schema.hasTable('config').then(function(exists) {
        if (!exists) {
            return knex.schema
            .createTable('config', function (table) {
                table.increments('id');
                table.integer('regionId');
                table.string('key').notNullable();
                table.string('value').notNullable();
                table.foreign('regionId').references('id').inTable('region');
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
    .dropTable("config")
    
};
