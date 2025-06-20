import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from './productSlice';
import ProductForm from './ProductForm';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!Array.isArray(items))
    return (
      <p className="text-red-500 text-center mt-4">
        Dữ liệu không hợp lệ
      </p>
    );
  if (loading)
    return (
      <p className="text-center text-blue-500 mt-4">
        Đang tải sản phẩm...
      </p>
    );

  const openAddModal = () => {
    setEditProduct(null);
    setShowModal(true);
  };
  const openEditModal = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen py-10 px-4 relative">
      <h2 className="text-3xl font-bold text-center mb-6">
        Danh sách sản phẩm
      </h2>

      {/* Nút thêm */}
      <div className="text-center mb-6">
        <button
          onClick={openAddModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Modal thêm / sửa */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-90 md:w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-white text-2xl font-bold hover:text-red-500"
              aria-label="Đóng"
            >
              &times;
            </button>

            <ProductForm
              onClose={() => setShowModal(false)}
              product={editProduct}
            />
          </div>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      
      <div className="max-w-7xl mx-auto flex flex-wrap justify-evenly gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="w-48 bg-zinc-800 rounded-lg shadow hover:shadow-xl transition-all duration-300"
          >
            <img
              src={product.images?.[0] || product.thumbnail || product.image}
              alt={product.title || product.name}
              className="w-full h-56 object-cover rounded-t-lg"
            />

            <div className="p-4">
              <p className="text-lg font-semibold text-white">
                ${product.price}
              </p>
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
                    if (
                      window.confirm(
                        'Bạn có chắc muốn xoá sản phẩm này?'
                      )
                    ) {
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
