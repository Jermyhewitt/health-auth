/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('region').del()
  await knex('region').insert([
    {id: 1, name: 'Jamaica'},
  ]);
  await knex('config').del()
  await knex('config').insert([
    {regionId: 1,key:"sessionLength",value:"10"},
    {regionId: 1,key:"signatureTimer",value:"13"},
    {regionId: 1,key:"usernameTimer",value:"3"},
    {regionId: 1,key:"passwordLength",value:"8"},
  ]);
};
