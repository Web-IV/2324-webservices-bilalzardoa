
const { tables } = require('../index');

module.exports = {
  seed: async (knex)=>{

    const journalexists = await knex('journal').count('* as count').first();

      // If there are existing entries, skip seeding
      if (journalexists.count > 0) {
        console.log('journals table already seeded. Skipping...');
        return;
      }  

    await knex(tables.journal).insert([
        {
            userId : 1,
            Date: '2023-01-01', 
            Content: 'This is a sample journal entry.', 
          },
          {
            userId : 2,
            Date: '2023-01-02', 
            Content: 'Another sample journal entry.',
          },
      // Add more seed entries as needed
    ]);
  }
}
