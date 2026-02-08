import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useData } from '../../contexts/DataContext';

const Dashboard: React.FC = () => {
    const { products, events, articles } = useData();

    const stats = [
        { title: 'Total Produk', value: products.length, icon: 'shopping_bag', color: 'bg-blue-500' },
        { title: 'Total Event', value: events.length, icon: 'calendar_month', color: 'bg-orange-500' },
        { title: 'Total Artikel', value: articles.length, icon: 'article', color: 'bg-purple-500' },
    ];

    return (
        <AdminLayout>
            <h1 className="text-3xl font-black text-slate-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={`size-12 rounded-xl ${stat.color} text-white flex items-center justify-center shadow-lg shadow-${stat.color.replace('bg-', '')}/30`}>
                            <span className="material-symbols-outlined">{stat.icon}</span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-bold">{stat.title}</p>
                            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Selamat Datang di Admin Panel</h2>
                <p className="text-slate-500">
                    Gunakan menu di samping untuk mengelola Produk, Event, dan Berita.
                    Perubahan yang Anda buat akan langsung tersimpan di browser ini (Local Storage) dan muncul di halaman publik.
                </p>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
