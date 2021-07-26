const Mail = require('../services/Mail');

const User = require('../database/models/Users');

class CreateUser {
  async execute(data) {
    if (data.average_salary > 501) {
      data.current_balance = 200.0;
      data.status = true;
    } else {
      data.current_balance = 0;
      data.status = false;
    }

    await User.create(data);

    const service = new Mail();

    await service.sendMail({
      name: data.full_name,
      email: data.email,
      status: data.status,
    });
  }
}

module.exports = CreateUser;