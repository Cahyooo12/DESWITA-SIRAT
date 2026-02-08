import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
        { name: 'Produk Shop', path: '/admin/products', icon: 'shopping_bag' },
        { name: 'Event', path: '/admin/events', icon: 'calendar_month' },
        { name: 'Berita', path: '/admin/news', icon: 'newspaper' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 fixed h-full z-10">
                <div className="p-6 border-b border-slate-100">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-white shadow-sm border border-slate-100 p-1 flex items-center justify-center">
                            <img src="https://uploads.onecompiler.io/43w9rf9r9/44brtpuy2/image_2026-01-27_002804190.png" alt="Logo" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-900 leading-tight text-sm">Desa Wisata</span>
                            <span className="text-[10px] text-primary font-black uppercase tracking-wider">Admin Panel</span>
                        </div>
                    </Link>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 flex flex-col gap-1">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">public</span>
                        Lihat Website
                    </Link>
                    <Link
                        to="/admin/login"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Keluar
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
