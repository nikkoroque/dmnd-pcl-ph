// pages/api/lab-diamonds/[sku].ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Product {
  'Lot #': string | number;
  [key: string]: string | number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sku } = req.query;

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'sup_one_current.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(rawData) as Product[];

    const product = products.find(
      (p: Product) => p['Lot #']?.toString() === sku?.toString()
    );

    if (!product) {
      return res.status(404).json({ message: `Product with Lot # ${sku} not found` });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by Lot #:', err);
    res.status(500).json({ message: 'Error reading products' });
  }
}
