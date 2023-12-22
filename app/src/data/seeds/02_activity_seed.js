
const { tables } = require('../index');

module.exports = {
  seed: async (knex)=>{

    const activityExists = await knex('activity').count('* as count').first();

      // If there are existing entries, skip seeding
      if (activityExists.count > 0) {
        console.log('activityExists table already seeded. Skipping...');
        return;
      }  

      await knex(tables.activity).insert([
        {
          userId: 1,
          date: '2023-01-01',
          content: 'This is a sample activity entry.',
        },
        {
          userId: 2,
          date: '2023-01-02',
          content: 'Another sample activity entry.',
        },
        // Add more seed entries as needed
      ]);
    }
}
