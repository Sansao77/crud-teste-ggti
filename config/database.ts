import pkg from 'pg';
import dotenv from 'dotenv';  // Importa o dotenv

dotenv.config();
const {Pool} = pkg;

const pool = new Pool({
  host: process.env['DB_HOST'], // 'postgres', nome do container
  user: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  port: parseInt(process.env['DB_PORT'] || '5432', 10),
});

pool.connect()
  .then(() => console.log('Conectado ao PostgreSQL com sucesso!'))
  .catch((err: any) => console.error('Erro ao conectar ao banco:', err));

export default pool;