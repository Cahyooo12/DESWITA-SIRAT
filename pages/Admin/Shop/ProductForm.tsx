import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import ImageUpload from '../../../components/ImageUpload';
import { useData } from '../../../contexts/DataContext';
import { Product } from '../../../types';

const ProductForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addProduct, updateProduct } = useData();

    const [formData, setFormData] = useState<Product>({
        id: '',
        name: '',
        price: 0,
        description: '',
        category: 'Drink',
        images: [],
        ingredients: '',
        usage: '',
        sizes: []
    });

    useEffect(() => {
        if (id) {
            const existingProduct = products.find(p => p.id === id);
            if (existingProduct) {
                setFormData(existingProduct);
            }
        } else {
            // Generate new ID for new product
            setFormData(prev => ({ ...prev, id: 'p' + Date.now() }));
        }
    }, [id, products]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Prepare data for submission, ensuring legacy fields are populated
        const submissionData = {
            ...formData,
            image: formData.images?.[0] || '',
            size: formData.sizes?.[0] || ''
        };

        if (id) {
            await updateProduct(submissionData);
        } else {
            await addProduct(submissionData);
        }
        navigate('/admin/products');
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 mb-8">{id ? 'Edit Produk' : 'Tambah Produk Baru'}</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Produk</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Harga (Rp)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            >
                                <option value="Drink">Minuman</option>
                                <option value="Care">Perawatan</option>
                                <option value="Seed">Bibit</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <ImageUpload
                                value={formData.images || []}
                                onChange={(value) => setFormData(prev => ({ ...prev, images: value as string[] }))}
                                label="Foto Produk (Bisa banyak)"
                                multiple
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Bahan Baku (Optional)</label>
                            <textarea
                                name="ingredients"
                                value={formData.ingredients || ''}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Saran Penyajian (Optional)</label>
                            <textarea
                                name="usage"
                                value={formData.usage || ''}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Varian Ukuran/Kemasan</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.sizes?.map((size, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-bold text-sm flex items-center gap-2">
                                        {size}
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, sizes: prev.sizes?.filter((_, i) => i !== idx) }))}
                                            className="hover:text-red-500"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Contoh: 50 gram, 100 gram, Botol 250ml"
                                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const val = e.currentTarget.value.trim();
                                            if (val) {
                                                setFormData(prev => ({ ...prev, sizes: [...(prev.sizes || []), val] }));
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        const val = input.value.trim();
                                        if (val) {
                                            setFormData(prev => ({ ...prev, sizes: [...(prev.sizes || []), val] }));
                                            input.value = '';
                                        }
                                    }}
                                    className="px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300 transition-colors"
                                >
                                    Tambah
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Tekan Enter atau klik Tambah untuk memasukkan varian.</p>

                        </div>

                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                        >
                            Simpan Produk
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ProductForm;
