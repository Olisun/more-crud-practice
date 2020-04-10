const socket = io();
const client = feathers();

client.configure(feathers.socketio(socket));

client.configure(feathers.authentication({
  storage: window.localStorage
}));


const login = async () => {
  try {
    return await client.reAuthenticate();
  } catch (error) {
    return await client.authenticate({
      strategy: 'local',
      email: 'crazykitty@mac.com',
      password: 'password'
    });
  }
};

const main = async () => {
  const auth = await login();
  console.log('User is authenticted', auth);
};

main();