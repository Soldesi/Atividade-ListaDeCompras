import app from './app';
import { connectDB } from './database';

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📦 API disponível em http://localhost:${PORT}/api/items`);
  });
};

startServer();
