import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';  // Importa o dotenv

dotenv.config();

// Crie uma nova instância do Sequelize com as credenciais do banco de dados
export const sequelize = new Sequelize(process.env['DB_NAME'] || '', process.env['DB_USER'] || '', process.env['DB_PASSWORD'] || '', {
  host: process.env['DB_HOST'],  // 'postgres' se estiver usando Docker
  port: parseInt(process.env['DB_PORT'] || '5432', 10),  // Porta do PostgreSQL
  dialect: 'postgres',  // O banco que você está usando
  logging: false,       // Desativa os logs SQL (opcional)
});

// Teste a conexão
sequelize.authenticate()
  .then(() => console.log('Conectado ao PostgreSQL com sucesso!'))
  .catch((err: any) => console.error('Erro ao conectar ao banco:', err));
