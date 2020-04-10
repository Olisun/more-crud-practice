const { Service } = require('feathers-mongoose');
const crypto = require('crypto');
const gravatarURL = 'https://s.gravatar.com/avatar';
const query = 's=60';

exports.Users = class Users extends Service {
  create(data, params) {
    const { email, password, githubId } = data;
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const avatar = `${gravatarURL}/${hash}?${query}`;
    const userData = {
      email,
      password,
      githubId,
      avatar
    };
    return super.create(userData, params);
  }
};
