const { hashPassword, verifyPassword } = require('./core/password');

async function main() {
  const password = 'verydifficult';
  const wrongPassword = 'verywrong';
  console.log('The password:', password);

  const hash = await hashPassword(password);
  // bekijk hoe de hash opgebouwd is, wat herken je?
  // waar staat de timeCost, memoryCost, salt en de hash zelf?
  console.log('The hash:', hash);

  let valid = await verifyPassword(password, hash);
  console.log('The password', password, 'is', valid ? 'valid' : 'incorrect');

  valid = await verifyPassword(wrongPassword, hash);
  console.log(
    'The password',
    wrongPassword,
    'is',
    valid ? 'valid' : 'incorrect'
  );
}

main();

const { generateJWT, verifyJWT } = require('./core/jwt');

function messWithPayload(jwt) {
  const [header, payload, signature] = jwt.split('.');
  const parsedPayload = JSON.parse(
    Buffer.from(payload, 'base64url').toString()
  );

  // make me admin please ^^
  parsedPayload.roles.push('admin');

  const newPayload = Buffer.from(
    JSON.stringify(parsedPayload),
    'ascii'
  ).toString('base64url');
  return [header, newPayload, signature].join('.');
}

async function main() {
  const fakeUser = {
    id: 1,
    firstName: 'bilal',
    lastName: 'zardpa',
    email: 'zardoabilal@gmail.com',
    roles: ['user'],
  };

  const jwt = await generateJWT(fakeUser);
  // copy and paste the JWT in the textfield on https://jwt.io
  // inspect the content
  console.log('The JWT:', jwt);

  let valid = await verifyJWT(jwt);
  console.log('This JWT is', valid ? 'valid' : 'incorrect');

  // Let's mess with the payload
  const messedUpJwt = messWithPayload(jwt);
  console.log('Messed up JWT:', messedUpJwt);

  console.log('Verifying this JWT will throw an error:');
  valid = await verifyJWT(messedUpJwt);
}

main();
