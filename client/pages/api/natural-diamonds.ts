// http://localhost:3000/api/supplier-two-nd?page=1&limit=20
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = (page - 1) * limit;

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'sup_two_current.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(rawData);

    const paginated = products.slice(offset, offset + limit);

    res.status(200).json({
      page,
      limit,
      total: products.length,
      data: paginated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error reading products' });
  }
}
