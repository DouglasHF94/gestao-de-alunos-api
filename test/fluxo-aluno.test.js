import request from 'supertest';
import { expect } from 'chai';

import app from '../src/app.js';

import dados from './data/usuarios.json' with { type: 'json' };

import { loginAdmin } from './helpers/admin.helper.js';
import { loginAluno } from './helpers/aluno.helper.js';

describe('Fluxo completo de gestão de aluno', () => {
  let tokenAdmin;
  let tokenAluno;
  let alunoId;

  it('deve fazer login como administrador', async () => {
    tokenAdmin = await loginAdmin();

    expect(tokenAdmin).to.be.a('string');
    expect(tokenAdmin).to.not.be.empty;
  });

  it('deve cadastrar um aluno como administrador', async () => {
    const resposta = await request(app)
      .post('/api/admin/alunos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(dados.aluno);

    expect(resposta.status).to.equal(201);

    expect(resposta.body).to.have.property('_id');

    alunoId = resposta.body._id;
  });

  it('deve fazer login como aluno', async () => {
    const resultado = await loginAluno(
      dados.aluno.email,
      dados.aluno.senha
    );

    tokenAluno = resultado.token;

    expect(tokenAluno).to.be.a('string');
    expect(resultado.usuario.email).to.equal(dados.aluno.email);

    alunoId = resultado.usuario.id;
  });

  it('deve registrar a entrega de um trabalho como aluno', async () => {
    const resposta = await request(app)
      .post(`/api/alunos/${alunoId}/trabalhos`)
      .set('Authorization', `Bearer ${tokenAluno}`)
      .send(dados.trabalho);

    expect(resposta.status).to.equal(201);

    expect(resposta.body).to.have.property('_id');
    expect(resposta.body.alunoId).to.equal(alunoId);
    expect(resposta.body.disciplinaId)
      .to.equal(dados.trabalho.disciplinaId);
    expect(resposta.body.titulo)
      .to.equal(dados.trabalho.titulo);
    expect(resposta.body.status)
      .to.equal('entregue');
  });
});