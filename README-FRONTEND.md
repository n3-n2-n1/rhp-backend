# Frontend - Documentación de Consumo de API

## 🚀 Endpoints Disponibles

### Base URL
```
Desarrollo: http://localhost:3000
Producción: [URL_DE_TU_API_DESPLEGADA]
```

## 📦 Productos API

### 1. Obtener todos los productos
```http
GET /products
```

**Query Parameters:**
- `search` (string, opcional): Buscar productos por nombre o descripción

**Respuesta:**
```javascript
[
  {
    "id": "string",
    "name": "string",
    "price": number,
    "description": "string",
    "image_url": "string",
    "category_id": "string",
    "features": {}, // JSON object
    "stock": number,
    "is_active": boolean,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "category": {
      "id": "string",
      "name": "string",
      "slug": "string"
    }
  }
]
```

### 2. Obtener productos por categoría
```http
GET /products/category/:categoryId
```

**Parámetros:**
- `categoryId` (string): ID de la categoría

### 3. Obtener un producto por ID
```http
GET /products/:id
```

**Parámetros:**
- `id` (string): ID del producto

**Respuesta:**
```javascript
{
  "id": "string",
  "name": "string",
  "price": number,
  "description": "string",
  "image_url": "string",
  "category_id": "string",
  "features": {},
  "stock": number,
  "is_active": boolean,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z",
  "category": {
    "id": "string",
    "name": "string",
    "slug": "string"
  }
}
```

### 4. Crear un producto
```http
POST /products
```

**Body:**
```javascript
{
  "name": "string",
  "price": number,
  "description": "string",
  "image_url": "string", // opcional
  "category_id": "string", // opcional
  "features": {}, // opcional
  "stock": number, // opcional, default: 0
  "is_active": boolean // opcional, default: true
}
```

### 5. Actualizar un producto
```http
PUT /products/:id
```

**Parámetros:**
- `id` (string): ID del producto

**Body:**
```javascript
{
  "name": "string",
  "price": number,
  "description": "string",
  "image_url": "string",
  "category_id": "string",
  "features": {},
  "stock": number,
  "is_active": boolean
}
```

### 6. Eliminar un producto
```http
DELETE /products/:id
```

**Parámetros:**
- `id` (string): ID del producto

## 🏷️ Categorías API

### 1. Obtener todas las categorías
```http
GET /categories
```

**Respuesta:**
```javascript
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "slug": "string",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "_count": {
      "products": number
    }
  }
]
```

### 2. Obtener categoría por ID
```http
GET /categories/:id
```

### 3. Obtener categoría por slug
```http
GET /categories/slug/:slug
```

### 4. Crear categoría
```http
POST /categories
```

**Body:**
```javascript
{
  "name": "string",
  "description": "string", // opcional
  "slug": "string"
}
```

### 5. Actualizar categoría
```http
PUT /categories/:id
```

### 6. Eliminar categoría
```http
DELETE /categories/:id
```

## 📸 Upload de Imágenes API

### 1. Subir imagen a Cloudinary
```http
POST /upload/image
```

**Content-Type:** `multipart/form-data`

**Body:**
- `file` (File): Archivo de imagen (JPEG, PNG, WebP, máx 5MB)

**Respuesta:**
```javascript
{
  "success": true,
  "imageUrl": "https://res.cloudinary.com/...",
  "message": "Image uploaded successfully"
}
```

### 2. Subir imagen y asignar a producto
```http
POST /upload/product/:productId/image
```

**Content-Type:** `multipart/form-data`

**Parámetros:**
- `productId` (string): ID del producto

**Body:**
- `file` (File): Archivo de imagen (JPEG, PNG, WebP, máx 5MB)

**Respuesta:**
```javascript
{
  "success": true,
  "product": {
    // Producto actualizado con nueva image_url
  },
  "message": "Product image updated successfully"
}
```

### 3. Actualizar URL de imagen de producto
```http
PUT /upload/product/:productId/image-url
```

**Parámetros:**
- `productId` (string): ID del producto

**Body:**
```javascript
{
  "imageUrl": "https://res.cloudinary.com/..."
}
```

**Respuesta:**
```javascript
{
  "success": true,
  "product": {
    // Producto actualizado
  },
  "message": "Product image URL updated successfully"
}
```

## 💻 Ejemplos de Uso en JavaScript

### Fetch API (Vanilla JS)
```javascript
// Obtener todos los productos
async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Crear un producto
async function createProduct(productData) {
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });
    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

// Actualizar un producto
async function updateProduct(id, productData) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });
    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

// Eliminar un producto
async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}
```

### Axios (React/Vue/Angular)
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear producto
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar producto
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### React Hook personalizado
```javascript
import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editProduct = async (id, productData) => {
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct
  };
};
```

### Upload de Imágenes

```javascript
// Subir imagen simple
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3000/upload/image', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// Subir imagen y asignar a producto
async function uploadProductImage(productId, file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`http://localhost:3000/upload/product/${productId}/image`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading product image:', error);
  }
}

// Actualizar URL de imagen de producto
async function updateProductImageUrl(productId, imageUrl) {
  try {
    const response = await fetch(`http://localhost:3000/upload/product/${productId}/image-url`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating product image URL:', error);
  }
}
```

## 🌐 Opciones GRATUITAS para Desplegar tu API

### 1. **Railway** (Recomendado) ⭐
- **Límite gratuito:** 500 horas de ejecución/mes + $5 USD de crédito
- **Ventajas:** Muy fácil de usar, soporte nativo para NestJS
- **Pasos:**
  1. Ir a [railway.app](https://railway.app)
  2. Conectar tu repositorio de GitHub
  3. Railway detecta automáticamente NestJS
  4. Se despliega automáticamente

### 2. **Render**
- **Límite gratuito:** 750 horas/mes (suficiente para uso bajo)
- **Ventajas:** Fácil configuración, SSL automático
- **Pasos:**
  1. Ir a [render.com](https://render.com)
  2. Conectar repositorio
  3. Configurar como "Web Service"
  4. Build Command: `npm run build`
  5. Start Command: `npm run start:prod`

### 3. **Cyclic**
- **Límite gratuito:** Generoso para aplicaciones pequeñas
- **Ventajas:** Deployment en 30 segundos
- **Pasos:**
  1. Ir a [cyclic.sh](https://cyclic.sh)
  2. Conectar GitHub
  3. Deploy automático

### 4. **Fly.io**
- **Límite gratuito:** 3 aplicaciones pequeñas
- **Ventajas:** Muy rápido, global CDN
- **Pasos:**
  1. Instalar CLI: `npm install -g @fly/flyctl`
  2. `fly auth login`
  3. `fly launch` en tu directorio del proyecto

### 5. **Heroku** (Limitado)
- **Límite gratuito:** Ya no ofrece tier gratuito, pero puedes usar créditos estudiantiles
- **Ventajas:** Muy conocido y documentado

## ⚙️ Configuración para Production

### Agregar al package.json:
```json
{
  "scripts": {
    "start:prod": "node dist/main"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Variables de entorno necesarias:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=tu_url_de_supabase
```

## 🔧 CORS Configuration
Para que tu frontend pueda consumir la API, asegúrate de tener CORS configurado:

```javascript
// En main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'https://tu-frontend.vercel.app'], // Agrega tu dominio de frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
```

## 📱 Ejemplo de uso en React

```jsx
import React from 'react';
import { useProducts } from './hooks/useProducts';

function ProductList() {
  const { products, loading, error, addProduct, removeProduct } = useProducts();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Productos</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
            <p>Stock: {product.stock}</p>
            <button onClick={() => removeProduct(product.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
```

## 🚀 Recomendación Final

Para tu caso de uso (empresa que lo usa muy poco), te recomiendo:

1. **Railway** para desplegar la API (muy fácil y suficiente para tráfico bajo)
2. **Vercel** o **Netlify** para el frontend (si tienes uno)
3. Tu **Supabase** ya está configurado y es gratuito hasta cierto límite

¡Con esto tendrás todo funcionando gratis y de manera profesional!

### Componente React para Upload de Imágenes

```jsx
import React, { useState } from 'react';

function ImageUpload({ productId, onImageUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validaciones
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Solo se permiten archivos JPEG, PNG y WebP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo debe ser menor a 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const endpoint = productId 
        ? `/upload/product/${productId}/image`
        : '/upload/image';

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        onImageUploaded?.(result);
        alert('Imagen subida exitosamente');
      } else {
        alert('Error al subir imagen');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al subir imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return (
    <div className="image-upload">
      <div
        className={`upload-area ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploading ? (
          <div className="upload-progress">
            <div className="spinner"></div>
            <p>Subiendo imagen...</p>
          </div>
        ) : (
          <>
            <div className="upload-icon">📸</div>
            <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
            <p className="upload-hint">JPEG, PNG, WebP (máx. 5MB)</p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" className="upload-button">
              Seleccionar archivo
            </label>
          </>
        )}
      </div>

      <style jsx>{`
        .upload-area {
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-area:hover,
        .upload-area.drag-over {
          border-color: #007bff;
          background-color: #f8f9fa;
        }

        .upload-area.uploading {
          pointer-events: none;
          opacity: 0.7;
        }

        .upload-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .upload-hint {
          font-size: 12px;
          color: #666;
          margin-top: 8px;
        }

        .upload-button {
          display: inline-block;
          background: #007bff;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 16px;
        }

        .upload-button:hover {
          background: #0056b3;
        }

        .upload-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Ejemplo de uso
function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image_url: ''
  });

  const handleImageUploaded = (result) => {
    if (result.imageUrl) {
      setProduct(prev => ({
        ...prev,
        image_url: result.imageUrl
      }));
    }
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={product.name}
        onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
      />
      
      <textarea
        placeholder="Descripción"
        value={product.description}
        onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
      />
      
      <input
        type="number"
        placeholder="Precio"
        value={product.price}
        onChange={(e) => setProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
      />

      <ImageUpload onImageUploaded={handleImageUploaded} />

      {product.image_url && (
        <div className="image-preview">
          <img src={product.image_url} alt="Preview" style={{ maxWidth: '200px' }} />
        </div>
      )}

      <button type="submit">Crear Producto</button>
    </form>
  );
}

export default ProductForm; 