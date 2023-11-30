// Mock data for Users
let USERS = [
  {
    id: 1,
    username: 'fitness_guru',
    email: 'fitness@example.com',
    password: 'hashed_password',
    profile: {
      name: 'Fitness Guru',
      profilePicture: 'path/to/fitness_profile_picture.jpg',
    },
  },
  // Add more users as needed
];
// Mock data for Friends
let FRIENDS = [
  {
    username: "x",
    friendname: "x",
  },
  // Add more friend connections as needed
];

module.exports = {
  USERS,
  FRIENDS,
};
