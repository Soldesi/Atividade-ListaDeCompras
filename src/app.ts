import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import shoppingRoutes from './routes/shoppingRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da API
app.use('/api/items', shoppingRoutes);

// Rota raiz → frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
