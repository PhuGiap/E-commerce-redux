import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from './productSlice';
import ProductForm from './ProductForm';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // trạng thái sản phẩm đang edit

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!Array.isArray(items)) {
    return <p className="text-red-500 text-center mt-4">Dữ liệu không hợp lệ</p>;
  }

  if (loading) return <p className="text-center text-blue-500 mt-4">Đang tải sản phẩm...</p>;

  const openAddModal = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  return (
    <div className="bg-zinc-900 min-h-screen py-10 px-4 text-white relative">
      <h2 className="text-3xl font-bold text-center mb-6">Danh sách sản phẩm</h2>

      <div className="text-center mb-6">
        <button
          onClick={openAddModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-16 right-2 text-white text-xl font-bold hover:text-red-500"
              aria-label="Close modal"
            >
              &times;
            </button>
            <ProductForm
              onClose={() => setShowModal(false)}
              product={editProduct} // truyền sản phẩm để sửa
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-800 rounded-lg shadow hover:shadow-xl transition-all duration-300"
          >
            <img
              src={product.images?.[0] || product.image}
              alt={product.title || product.name}
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <p className="text-lg font-semibold">${product.price}</p>
              <h3 className="text-sm text-gray-200 mt-1 line-clamp-2">
                {product.title || product.name}
              </h3>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => openEditModal(product)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                >
                  Sửa
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
                      dispatch(deleteProduct(product.id));
                    }
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                >
                  Xoá
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
