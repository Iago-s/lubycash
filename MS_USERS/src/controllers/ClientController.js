const Client = require('../database/models/Client');

module.exports = {
  index: async function (req, res) {
    const clients = await Client.findAll();

    return res.json(clients);
  },
};
