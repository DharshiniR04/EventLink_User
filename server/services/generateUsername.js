const Users = require('../models/users');

const generateUsername = async (name, email) => {
  let baseUsername = name.toLowerCase().replace(/\s+/g, '') || email.split('@')[0];
  let username = baseUsername;
  
  let isUnique = await isUsernameUnique(username);

  while (!isUnique) {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000; 
    username = `${baseUsername}${randomNumber}`;
    isUnique = await isUsernameUnique(username);
  }

  return username;
};

const isUsernameUnique = async (username) => {
  const existingUser = await Users.findOne({ username });
  return !existingUser; 
};

module.exports = {
  generateUsername
};
