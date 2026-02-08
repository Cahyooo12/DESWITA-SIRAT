import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { useData } from '../../../contexts/DataContext';

const NewsList: React.FC = () => {
    const { articles, deleteArticle } = useData();

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-slate-900">Kelola Berita</h1>
                <Link to="/admin/news/new" className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    Tambah Berita
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 font-bold text-slate-600 text-sm">Gambar</th>
                            <th className="p-4 font-bold text-slate-600 text-sm">Judul</th>
                            <th className="p-4 font-bold text-slate-600 text-sm">Kategori</th>
                            <th className="p-4 font-bold text-slate-600 text-sm">Tanggal</th>
                            <th className="p-4 font-bold text-slate-600 text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4">
                                    <div className="size-12 rounded-lg bg-slate-100 overflow-hidden">
                                        <img src={article.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-4 font-bold text-slate-900 max-w-xs truncate" title={article.title}>{article.title}</td>
                                <td className="p-4">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                                        {article.category || '-'}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-600 text-sm">{article.date}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Link to={`/admin/news/edit/${article.id}`} className="size-8 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center hover:bg-yellow-200">
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Yakin ingin menghapus berita ini?')) deleteArticle(article.id);
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
                {articles.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        Belum ada berita. Silakan tambah berita baru.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default NewsList;
