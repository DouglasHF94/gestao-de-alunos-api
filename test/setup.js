import '../src/database/db.js';

import Aluno from '../src/models/aluno.model.js';
import Trabalho from '../src/models/trabalho.model.js';
import Matricula from '../src/models/matricula.model.js';

import { seed } from '../src/database/seed.js';

await seed();

await Trabalho.deleteMany({
  titulo: 'Trabalho de Teste Automatizado',
});

const aluno = await Aluno.findOne({
  email: 'douglas.teste@example.com',
});

if (aluno) {
  await Matricula.deleteMany({
    alunoId: aluno._id,
  });

  await Aluno.deleteOne({
    _id: aluno._id,
  });
}