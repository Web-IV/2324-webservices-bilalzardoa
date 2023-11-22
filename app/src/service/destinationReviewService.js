let { USERS, DESTINATIONS, ITINERARIES, REVIEWS } = require('../data/mock_data');

const getAllUsers = () => {
  return USERS;
};

const getUserById = (userId) => {
  return USERS.find(user => user.id === userId);
};

const getAllDestinations = () => {
  return DESTINATIONS;
};

const getDestinationById = (destinationId) => {
  return DESTINATIONS.find(destination => destination.id === destinationId);
};

const getAllItineraries = () => {
  return ITINERARIES;
};

const getItineraryById = (itineraryId) => {
  return ITINERARIES.find(itinerary => itinerary.id === itineraryId);
};

const getAllReviews = () => {
  return REVIEWS;
};

const getReviewById = (reviewId) => {
  return REVIEWS.find(review => review.id === reviewId);
};

const createReview = ({ userId, destinationId, rating, comments }) => {
  // Create a new review object
  const newReview = {
    id: REVIEWS.length + 1,
    userId,
    destinationId,
    rating,
    comments,
  };

  // Push the new review to the REVIEWS array
  REVIEWS.push(newReview);

  return newReview;
};


module.exports = {
  getAllUsers,
  getUserById,
  getAllDestinations,
  getDestinationById,
  getAllItineraries,
  getItineraryById,
  getAllReviews,
  getReviewById,
};
