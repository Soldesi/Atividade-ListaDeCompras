import { Schema, model, Document } from 'mongoose';

export interface IShoppingItem extends Document {
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const ShoppingItemSchema = new Schema<IShoppingItem>(
  {
    name: {
      type: String,
      required: [true, 'O nome do produto é obrigatório'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'O valor do produto é obrigatório'],
      min: [0, 'O valor não pode ser negativo'],
    },
  },
  {
    timestamps: true,
    collection: 'shoppingitems',
  }
);

export const ShoppingItem = model<IShoppingItem>('ShoppingItem', ShoppingItemSchema);
