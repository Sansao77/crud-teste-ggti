import express, { Request, Response } from 'express';
import pool from '../config/database'; // Se o database.ts também estiver usando TS, remova a extensão .js
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Tipagem para o corpo da requisição POST e PUT
interface UserRequestBody {
  name: string;
  email: string;
}

// Tipagem para o parâmetro 'id' nas requisições
interface UserIdParams {
  id: string;
}

// Obtendo a lista de usuários do banco de dados
router.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtendo usuário por uuid
router.get('/users/:id', async (req: Request<UserIdParams>, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Criando um novo usuário
router.post('/users', async (req: Request<{}, {}, UserRequestBody>, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *',
      [uuidv4(), name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizando usuário
router.put('/users/:id', async (req: Request<UserIdParams, {}, UserRequestBody>, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Deletando usuário por uuid
router.delete('/users/:id', async (req: Request<UserIdParams>, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
