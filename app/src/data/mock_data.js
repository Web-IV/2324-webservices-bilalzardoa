// Mock data for Users
let USERS = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      password: 'hashed_password',
      profile: {
        name: 'John Doe',
        profilePicture: 'path/to/profile_picture.jpg',
      },
    },
    // Add more users as needed
  ];
  
  // Mock data for Destinations
  let DESTINATIONS = [
    {
      id: 1,
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
      },
      description: 'The city of love and lights.',
      category: 'city',
    },
    // Add more destinations as needed
  ];
  
  // Mock data for Itineraries
  let ITINERARIES = [
    {
      id: 1,
      userId: 1,
      title: 'European Adventure',
      startDate: '2022-01-01',
      endDate: '2022-01-15',
    },
    // Add more itineraries as needed
  ];
  
  // Mock data for Reviews
  let REVIEWS = [
    {
      id: 1,
      userId: 1,
      destinationId: 1,
      rating: 5,
      comments: 'A fantastic place to visit!',
    },
    // Add more reviews as needed
  ];
  
  module.exports = { USERS, DESTINATIONS, ITINERARIES, REVIEWS };
  