import request from 'supertest';
import app from '../../src/app.js';

import dados from '../data/usuarios.json' with { type: 'json' };

export async function loginAdmin() {
  const resposta = await request(app)
    .post('/api/auth/login')
    .send({
      email: dados.admin.email,
      senha: dados.admin.senha
    });

  return resposta.body.token;
}

