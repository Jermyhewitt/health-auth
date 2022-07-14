/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    knex.schema.hasTable('region').then(function(exists) {
        if (!exists) {
            return knex.schema
            .createTable('region', function (table) {
                table.increments('id');
                table.string('name').notNullable();               
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
    .dropTable("region")
    
};
