import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { useData } from '../../../contexts/DataContext';

const ProductList: React.FC = () => {
    const { products, deleteProduct } = useData();

    return (
        <AdminLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-black text-slate-900">Kelola Produk</h1>
                <Link to="/admin/products/new" className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    Tambah Produk
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="p-4 font-bold text-slate-600 text-sm">Gambar</th>
                                <th className="p-4 font-bold text-slate-600 text-sm">Nama Produk</th>
                                <th className="p-4 font-bold text-slate-600 text-sm">Harga</th>
                                <th className="p-4 font-bold text-slate-600 text-sm">Kategori</th>
                                <th className="p-4 font-bold text-slate-600 text-sm">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="size-12 rounded-lg bg-slate-100 overflow-hidden">
                                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-slate-900">{product.name}</td>
                                    <td className="p-4 text-slate-600">Rp{product.price.toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.category === 'Drink' ? 'bg-blue-100 text-blue-600' :
                                            product.category === 'Care' ? 'bg-pink-100 text-pink-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Link to={`/admin/products/edit/${product.id}`} className="size-8 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center hover:bg-yellow-200">
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Yakin ingin menghapus produk ini?')) deleteProduct(product.id);
                                                }}
                                                className="size-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        Belum ada produk. Silakan tambah produk baru.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProductList;
