const activityRepo = require('../repository/activityRepo');
const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBerror');

  // Function to get all activitys for a specific user
  const getAllactivitiesByUserId =  async (userId) => {
    try {
        const activity = await activityRepo.getAllactivitiesByUserId(userId);
      if (!activity) {
        throw new ServiceError('activity not found', 404);
      }
      return activity
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error getting activities', 500);
    }
  }

  // Function to get a activity by its ID
  const getActivityById =  async (activityId) => {
    try {
      const activity = await activityRepo.getActivityById(activityId);

      if (!activity) {
        throw new ServiceError('activity not found', 404);
      }

      return activity;
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error getting activity by ID', 500);
    }
  }

  // Function to add a new activity entry
  const addActivityEntry= async (userId, date, content) => {
    try {
      const addactivity = await activityRepo.addActivityEntry(userId, date, content);
      if (!addactivity) {
        throw new ServiceError('User not found', 404);
      }
      return addactivity
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error adding activity entry', 500);
    }
  }

  // Function to update an existing activity entry
  const updateActivityEntry =  async (activityId, newContent) => {
    try {
      const activityExists = await activityRepo.getActivityById(activityId);

      if (!activityExists) {
        throw new ServiceError('activity not found', 404);
      }

      return await activityRepo.updateActivityEntry(activityId, newContent);
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error updating activity entry', 500);
    }
  }

  // Function to delete a activity entry by its ID
  const deleteActivityEntry =  async (activityId) => {
    try {
      const activityExists = await activityRepo.getActivityById(activityId);

      if (!activityExists) {
        throw new ServiceError('activity not found', 404);
      }

      return await activityRepo.deleteActivityEntry(activityId);
    } catch (error) {
      handleDBError(error);
      throw new ServiceError('Error deleting activity entry', 500);
    }
  }

module.exports = {
    deleteActivityEntry,
    updateActivityEntry,
    getActivityById,
    getAllactivitiesByUserId,
    addActivityEntry,
};
