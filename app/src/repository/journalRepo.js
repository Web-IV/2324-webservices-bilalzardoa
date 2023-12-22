/*
Table: journal
Columns:
id int UN AI PK 
userId int UN 
Date date 
Content text*/


const { getKnex, tables } = require('../data/index');
const { getLogger } = require('../core/logging');

  // Function to get all journals for a specific user
  const getAllJournalsByUserId = async (userId) => {
    try {
      const knex = getKnex();
      const journals = await knex(tables.journal)
        .select('*')
        .where({ userId });

      return journals;
    } catch (error) {
        getLogger.error(`Error in getAllJournalsByUserId: ${error.message}`);
      throw error;
    }
  }

  // Function to get a journal by its ID
  const getJournalById = async (journalId) => {
    try {
      const knex = getKnex();
      const journal = await knex(tables.journal)
        .select('*')
        .where({ id: journalId })
        .first();

      return journal;
    } catch (error) {
        getLogger.error(`Error in getJournalById: ${error.message}`);
      throw error;
    }
  }

  // Function to add a new journal entry
  const addJournalEntry = async (userId, date, content) => {
    try {
      const knex = getKnex();
      const [journalId] = await knex(tables.journal)
        .insert({
          userId,
          Date: date,
          Content: content,
        });

      return journalId;
    } catch (error) {
        getLogger.error(`Error in addJournalEntry: ${error.message}`);
      throw error;
    }
  }

  // Function to update an existing journal entry
  const updateJournalEntry = async (journalId, updatedContent) => {
    try {
      const knex = getKnex();
      const updatedRows = await knex(tables.journal)
        .where({ id: journalId })
        .update({
          Content: updatedContent,
        })
        .returning('*'); // Use the 'returning' method to get the updated row

        if (updatedRows.length > 0) {
          // Return the updated row if at least one row was updated
          return updatedRows[0];
        } else {
          // No row was updated
          return null;
        }
      } catch (error) {
        getLogger.error(`Error in updateJournalEntry: ${error.message}`);
        throw error;
      }
    };

  // Function to delete a journal entry by its ID
  const deleteJournalEntry =  async (journalId) => {
    try {
      const knex = getKnex();
      const deletedRows = await knex(tables.journal)
        .where({ id: journalId })
        .del()
        .returning('*'); // Use the 'returning' method to get the deleted row

        if (deletedRows.length > 0) {
          // Return the deleted row if at least one row was deleted
          return deletedRows[0];
        } else {
          // No row was deleted
          return null;
        }
      } catch (error) {
        getLogger.error(`Error in deleteJournalEntry: ${error.message}`);
        throw error;
      }
    };

module.exports = {
    getAllJournalsByUserId,
    getJournalById,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
};
