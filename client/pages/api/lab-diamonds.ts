// http://localhost:3000/api/lab-diamonds?page=1&limit=20
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type DiamondProduct = {
  'Lot #': string;
  Shape: string;
  Color: string;
  Clarity: string;
  Weight: number;
  Lab: string;
  'Diamond Parcel Price': number;
  'Total Amount': number;
  'Diamond Image': string;
  [key: string]: string | number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = (page - 1) * limit;

  const search = (req.query.search as string || '').toLowerCase();
  const shape = req.query.shape?.toString().toLowerCase().split(',').map(s => s.trim()) || [];
  const color = req.query.color?.toString().toLowerCase().split(',') || [];
  const clarity = req.query.clarity?.toString().toLowerCase().split(',') || [];
  const minPrice = parseFloat(req.query.minPrice as string) || 0;
  const maxPrice = parseFloat(req.query.maxPrice as string) || Infinity;
  const minCarat = parseFloat(req.query.minCarat as string) || 0;
  const maxCarat = parseFloat(req.query.maxCarat as string) || Infinity;

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'sup_one_current.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    let products = JSON.parse(rawData) as DiamondProduct[];

    products = products.filter((product) => {
      // General search
      const matchesSearch = !search || (
        product['Lot #']?.toString().toLowerCase().includes(search) ||
        product['Certificate #']?.toString().toLowerCase().includes(search)
      );

      const matchesShape = shape.length === 0 || shape.includes(product['Shape']?.toString().toLowerCase().trim());
      const matchesColor = color.length === 0 || color.includes(product['Color']?.toLowerCase());
      const matchesClarity = clarity.length === 0 || clarity.includes(product['Clarity']?.toLowerCase());
      const matchesPrice = product['Diamond Parcel Price'] >= minPrice && product['Diamond Parcel Price'] <= maxPrice;
      const matchesCarat = product['Weight'] >= minCarat && product['Weight'] <= maxCarat;

      return matchesSearch && matchesShape && matchesColor && matchesClarity && matchesPrice && matchesCarat;
    });

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

/////////////////////////////////////////////////////////
//////////////// API ENDPOINTS //////////////////////////
// Generic Search http://localhost:3000/api/lab-diamonds?search=VVS2
// Price Filter http://localhost:3000/api/lab-diamonds?minPrice=1000&maxPrice=3000&page=1&limit=20 
// Shape Filter http://localhost:3000/api/lab-diamonds?shape=round,cushion&page=1&limit=20
// /api/lab-diamonds?search=pear
// /api/lab-diamonds?shape=round,cushion
// /api/lab-diamonds?minPrice=1000&maxPrice=5000
// /api/lab-diamonds?clarity=vvs1,vvs2&color=e,f,g






