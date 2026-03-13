# 🛒 Lista de Compras — CRUD com TypeScript + MongoDB

Projeto desenvolvido para a **Aula 5 – Desenvolvimento Web III (FATEC)**  
Stack: **Node.js · TypeScript · Express · Mongoose · MongoDB**

---

## 📁 Estrutura de Diretórios

```
lista-compras/
├── src/
│   ├── models/
│   │   └── ShoppingItem.ts      # Schema e modelo Mongoose
│   ├── controllers/
│   │   └── shoppingController.ts # Lógica CRUD
│   ├── routes/
│   │   └── shoppingRoutes.ts    # Rotas da API REST
│   ├── app.ts                   # Configuração do Express
│   ├── database.ts              # Conexão com MongoDB
│   └── server.ts                # Ponto de entrada
├── public/
│   └── index.html               # Frontend (HTML/CSS/JS)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18+
- MongoDB rodando localmente (ou MongoDB Atlas)

### Passo a passo

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev

# 3. (Opcional) Compilar para produção
npm run build
npm start
```

Acesse: **http://localhost:3000**

---

## 🗄️ MongoDB

- **Banco de dados:** `shopping-list`  
- **Coleção:** `shoppingitems`

Conexão padrão: `mongodb://localhost:27017/shopping-list`

Para usar outra URI, defina a variável de ambiente:
```bash
MONGO_URI=mongodb+srv://... npm run dev
```

---

## 🔌 API REST

| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| GET    | /api/items        | Listar todos os itens  |
| GET    | /api/items/:id    | Buscar item por ID     |
| POST   | /api/items        | Criar novo item        |
| PUT    | /api/items/:id    | Atualizar item         |
| DELETE | /api/items/:id    | Excluir item           |

### Exemplo de body (POST / PUT)
```json
{
  "name": "Chocolate Milka",
  "price": 15.00
}
```

---

## 🛠️ Scripts

| Comando       | Descrição                          |
|---------------|------------------------------------|
| `npm run dev` | Inicia com ts-node (desenvolvimento)|
| `npm run build` | Compila TypeScript → dist/       |
| `npm start`   | Roda versão compilada              |
