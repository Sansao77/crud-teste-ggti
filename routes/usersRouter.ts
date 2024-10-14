import express, { Request, Response } from 'express';
import User from '../models/user'; // Importa o modelo User
import { v4 as uuidv4 } from 'uuid'; // Importa o v4 do uuid

const router = express.Router();

// Tipagem para o corpo da requisição POST e PUT
interface UserRequestBody {
  name: string;
  email: string;
  specialty: string;
  crm: string;
  phone?: string;
  date_employment?: string;
  time_begin?: string;
  time_end?: string;
  status?: boolean;
  days_attend?: string[];
}

// Tipagem para o parâmetro 'id' nas requisições
interface UserIdParams {
  id: string;
}

// Obtendo a lista de usuários do banco de dados
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users); // Retorna a resposta
  } catch (error: any) {
    return res.status(500).json({ error: error.message }); // Retorna a resposta em caso de erro
  }
});

// Obtendo usuário por uuid
router.get('/users/:id', async (req: Request<UserIdParams>, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json(user); // Retorna a resposta
  } catch (error: any) {
    return res.status(500).json({ error: error.message }); // Retorna a resposta em caso de erro
  }
});

// Criando um novo usuário
router.post('/users', async (req: Request<{}, {}, UserRequestBody>, res: Response) => {
  const { name, email, specialty, crm, phone, date_employment, time_begin, time_end, status, days_attend } = req.body;

  try {
    const user = await User.create({
      id: uuidv4(), // Gerando o UUID aqui
      name,
      email,
      specialty,
      crm,
      phone,
      date_employment,
      time_begin,
      time_end,
      status,
      days_attend,
    });
    return res.status(201).json(user); // Retorna a resposta
  } catch (error: any) {
    return res.status(500).json({ error: error.message }); // Retorna a resposta em caso de erro
  }
});

// Atualizando usuário
router.put('/users/:id', async (req: Request<UserIdParams, {}, UserRequestBody>, res: Response) => {
  const { id } = req.params;
  const { name, email, specialty, crm, phone, date_employment, time_begin, time_end, status, days_attend } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualiza os dados do usuário
    await user.update({
      name,
      email,
      specialty,
      crm,
      phone,
      date_employment,
      time_begin,
      time_end,
      status,
      days_attend,
    });

    return res.status(200).json(user); // Retorna a resposta
  } catch (error: any) {
    return res.status(500).json({ error: error.message }); // Retorna a resposta em caso de erro
  }
});

// Deletando usuário por uuid
router.delete('/users/:id', async (req: Request<UserIdParams>, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();
    return res.status(200).json({ message: 'Usuário deletado com sucesso' }); // Retorna a resposta
  } catch (error: any) {
    return res.status(500).json({ error: error.message }); // Retorna a resposta em caso de erro
  }
});

export default router;
