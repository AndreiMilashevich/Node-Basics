const os = require('os');
const { userName: user, sayHi: sayHi } = require('./test');

const name = 'Tom';

console.log(sayHi(name));
console.log(os.platform(), os.release());

module.exports = name;