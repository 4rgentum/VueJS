const dotenv = require('dotenv');
const fs = require('fs');
const env = process.argv[2] || 'local';
const envFile = `.env.${env}`;
if (!fs.existsSync(envFile)) {
console.error(`❌ Файл конфигурации ${envFile} не найден.`);
process.exit(1);
}
dotenv.config({ path: envFile });
console.log('Текущая конфигурация:');
console.log(`ENV_NAME = ${process.env.ENV_NAME}`);
console.log(`API_URL = ${process.env.API_URL}`);
console.log(`DEBUG
= ${process.env.DEBUG}`);