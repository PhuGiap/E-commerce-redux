import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct, fetchProducts } from './productSlice';

const ProductForm = ({ product, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setName(product.name || product.title || '');
      setDescription(product.description || '');
      setPrice(product.price?.toString() || '');
      setStock(product.stock?.toString() || '');
      setCategory(product.category || '');
      setImageUrl(product.image || '');
    } else {
      // Nếu thêm mới thì reset form
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('');
      setImageUrl('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !stock) {
      alert('Vui lòng nhập đầy đủ tên sản phẩm, giá và số lượng tồn kho');
      return;
    }

    const productData = {
      title: name.trim(),
      description: description.trim() || undefined,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category: category.trim() || undefined,
      image: imageUrl.trim() || undefined,
    };

    try {
      if (product && product.id) {
        await dispatch(updateProduct({ id: product.id, ...productData }));
      } else {
        await dispatch(addProduct(productData));
      }
      if (onClose) onClose();
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
    }
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md max-w-md mx-auto mt-8 text-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        {product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên sản phẩm *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Mô tả sản phẩm (tuỳ chọn)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Giá *"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Số lượng tồn kho *"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Danh mục (tuỳ chọn)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Link ảnh sản phẩm (tuỳ chọn)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="mt-2 w-full h-40 object-contain rounded border border-zinc-600"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          {product ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
