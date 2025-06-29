export class Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category_id: string;
  features: JSON;
  stock: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
