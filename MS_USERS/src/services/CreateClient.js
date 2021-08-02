const Mail = require('./Mail');

const Client = require('../database/models/Client');

class CreateClient {
  async execute(data) {
    if (data.average_salary > 500) {
      data.current_balance = 200.0;
      data.status = true;
    } else {
      data.current_balance = 0;
      data.status = false;
    }

    try {
      await Client.create(data);

      const service = new Mail();

      await service.sendMail({
        name: data.full_name,
        email: data.email,
        status: data.status,
      });
    } catch (err) {}
  }
}

module.exports = CreateClient;
