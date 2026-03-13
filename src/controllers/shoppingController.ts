import { Request, Response } from 'express';
import { ShoppingItem } from '../models/ShoppingItem';

// GET /api/items — Listar todos os itens
export const getAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await ShoppingItem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar itens', error });
  }
};

// GET /api/items/:id — Buscar item por ID
export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ShoppingItem.findById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Item não encontrado' });
      return;
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar item', error });
  }
};

// POST /api/items — Criar novo item
export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      res.status(400).json({ success: false, message: 'Nome e valor são obrigatórios' });
      return;
    }

    const newItem = await ShoppingItem.create({ name, price });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao criar item', error });
  }
};

// PUT /api/items/:id — Atualizar item
export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price } = req.body;

    const item = await ShoppingItem.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true, runValidators: true }
    );

    if (!item) {
      res.status(404).json({ success: false, message: 'Item não encontrado' });
      return;
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar item', error });
  }
};

// DELETE /api/items/:id — Deletar item
export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ShoppingItem.findByIdAndDelete(req.params.id);

    if (!item) {
      res.status(404).json({ success: false, message: 'Item não encontrado' });
      return;
    }

    res.status(200).json({ success: true, message: 'Item excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao excluir item', error });
  }
};
