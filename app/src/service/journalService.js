const JournalRepository = require('../repository/journalRepo');
const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBerror');

  // Function to get all journals for a specific user
  const getAllJournalsByUserId =  async (userId) => {
    try {
        const journals = await JournalRepository.getAllJournalsByUserId(userId);
      if (!journals) {
        throw new ServiceError('journal not found', 404);
      }
      return journals
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error getting journals', 500);
    }
  }

  // Function to get a journal by its ID
  const getJournalById =  async (journalId) => {
    try {
      const journal = await JournalRepository.getJournalById(journalId);

      if (!journal) {
        throw new ServiceError('Journal not found', 404);
      }

      return journal;
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error getting journal by ID', 500);
    }
  }

  // Function to add a new journal entry
  const addJournalEntry= async (userId, date, content) => {
    try {
      const addJournal = await JournalRepository.addJournalEntry(userId, date, content);
      if (!addJournal) {
        throw new ServiceError('User not found', 404);
      }
      return addJournal
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error adding journal entry', 500);
    }
  }

  // Function to update an existing journal entry
  const updateJournalEntry =  async (journalId, newContent) => {
    try {
      const journalExists = await JournalRepository.getJournalById(journalId);

      if (!journalExists) {
        throw new ServiceError('Journal not found', 404);
      }

      return await JournalRepository.updateJournalEntry(journalId, newContent);
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error updating journal entry', 500);
    }
  }

  // Function to delete a journal entry by its ID
  const deleteJournalEntry =  async (journalId) => {
    try {
      const journalExists = await JournalRepository.getJournalById(journalId);

      if (!journalExists) {
        throw new ServiceError('Journal not found', 404);
      }

      return await JournalRepository.deleteJournalEntry(journalId);
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error deleting journal entry', 500);
    }
  }

module.exports = {
    deleteJournalEntry,
    updateJournalEntry,
    addJournalEntry,
    getAllJournalsByUserId,
    getJournalById
};
