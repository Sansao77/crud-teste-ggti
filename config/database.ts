import { Sequelize } from 'sequelize';
require('dotenv').config();

// Ver como resolver esse erro
const sequelize = new Sequelize(process.env['DB_NAME'], process.env['DB_USER'], process.env['DB_PASSWORD'], {
  host: process.env['DB_HOST'],
  dialect: 'postgres',
  port: process.env['DB_PORT'],
});

sequelize.authenticate()
  .then(() => console.log('Conexão estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar no banco:', err));

export default sequelize;
