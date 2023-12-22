
const { getKnex, tables } = require('../data/index');
const { getLogger } = require('../core/logging');

  // Function to get all journals for a specific user
  const getAllactivitiesByUserId = async (userId) => {
    try {
      const knex = getKnex();
      const activity = await knex(tables.activity)
        .select('*')
        .where({ userId });

      return activity;
    } catch (error) {
        getLogger.error(`Error in getAllactivitiesByUserId: ${error.message}`);
      throw error;
    }
  }

  // Function to get a journal by its ID
  const getActivityById = async (activityId) => {
    try {
      const knex = getKnex();
      const activity = await knex(tables.activity)
        .select('*')
        .where({ id: activityId })
        .first();

      return activity;
    } catch (error) {
        getLogger.error(`Error in getActivityById: ${error.message}`);
      throw error;
    }
  }

  // Function to add a new journal entry
  const addActivityEntry = async (userId, date, content) => {
    try {
      const knex = getKnex();
      const [activityId] = await knex(tables.activity)
        .insert({
          userId,
          Date: date,
          Content: content,
        });

      return activityId;
    } catch (error) {
        getLogger.error(`Error in addActivityEntry: ${error.message}`);
      throw error;
    }
  }

  // Function to update an existing journal entry
  const updateActivityEntry = async (activityIdId, updatedContent) => {
    try {
      const knex = getKnex();
      const updatedRows = await knex(tables.activity)
        .where({ id: activityIdId })
        .update({
          Content: updatedContent,
        });

      return updatedRows > 0;
    } catch (error) {
        getLogger.error(`Error in updateActivityEntry: ${error.message}`);
      throw error;
    }
  }

  // Function to delete a journal entry by its ID
  const deleteActivityEntry =  async (activityId) => {
    try {
      const knex = getKnex();
      const deletedRows = await knex(tables.activity)
        .where({ id: activityId })
        .del();

      return deletedRows > 0;
    } catch (error) {
        getLogger.error(`Error in deleteActivityEntry: ${error.message}`);
      throw error;
    }
  }


module.exports = {
   deleteActivityEntry,
   updateActivityEntry,
   addActivityEntry,
   getActivityById,
   getAllactivitiesByUserId,
};
