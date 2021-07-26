const User = require('../database/models/Users');

module.exports = {
  index: async function (req, res) {
    const users = await User.findAll();

    return res.json(users);
  },
};
