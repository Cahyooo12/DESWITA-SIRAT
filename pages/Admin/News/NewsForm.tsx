import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import ImageUpload from '../../../components/ImageUpload';
import { useData } from '../../../contexts/DataContext';
import { Article } from '../../../types';

const NewsForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { articles, addArticle, updateArticle } = useData();

    const [formData, setFormData] = useState<Article>({
        id: '',
        title: '',
        excerpt: '',
        image: '',
        url: '',
        content: '',
        views: '0',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        category: 'Produk & UMKM'
    });

    useEffect(() => {
        if (id) {
            const existingArticle = articles.find(a => a.id === id);
            if (existingArticle) {
                setFormData(existingArticle);
            }
        } else {
            setFormData(prev => ({ ...prev, id: 'a' + Date.now() }));
        }
    }, [id, articles]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.content?.trim() && !formData.url?.trim()) {
            alert('Harap isi "Isi Berita" atau "Link Sumber Lengkap" (salah satu harus diisi).');
            return;
        }

        try {
            if (id) {
                await updateArticle(formData);
            } else {
                await addArticle(formData);
            }
            navigate('/admin/news');
        } catch (error) {
            console.error(error);
            alert('Gagal menyimpan berita. Pastikan server backend berjalan (npm run server).');
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 mb-8">{id ? 'Edit Berita' : 'Tambah Berita Baru'}</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Judul Artikel</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
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
                                <option value="Produk & UMKM">Produk & UMKM</option>
                                <option value="Kisah Komunitas">Kisah Komunitas</option>
                                <option value="Tips Kesehatan">Tips Kesehatan</option>
                                <option value="Events & Festival">Events & Festival</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label>
                            <input
                                type="date"
                                name="dateISO"
                                value={formData.dateISO || new Date().toISOString().split('T')[0]}
                                onChange={(e) => {
                                    const newDateISO = e.target.value;
                                    const dateObj = new Date(newDateISO);
                                    const formattedDate = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

                                    setFormData(prev => ({
                                        ...prev,
                                        dateISO: newDateISO,
                                        date: formattedDate
                                    }));
                                }}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <ImageUpload
                                value={formData.image}
                                onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
                                label="Foto Berita"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita (Opsional jika ada Link Sumber)</label>
                            <textarea
                                name="content"
                                value={formData.content || ''}
                                onChange={handleChange}
                                rows={10}
                                placeholder="Tulis is berita di sini..."
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Link Sumber Lengkap (Opsional)</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url || ''}
                                onChange={handleChange}
                                placeholder="https://... (Kosongkan jika berita ditulis langsung di sini)"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Ringkasan (Excerpt)</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Kutipan / Highlight (Opsional)</label>
                            <textarea
                                name="quote"
                                value={formData.quote || ''}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Masukkan kutipan menarik untuk ditampilkan di dalam artikel..."
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/news')}
                            className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                        >
                            Simpan Berita
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default NewsForm;
