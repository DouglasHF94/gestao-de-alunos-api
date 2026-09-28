import './database/db.js';
import { seed } from './database/seed.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

await seed();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});