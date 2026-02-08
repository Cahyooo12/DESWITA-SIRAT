import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock login
        if (username === 'admin' && password === 'sitelangsirat123') {
            localStorage.setItem('token', 'admin_token_secure_123'); // Set token instead of isAdmin
            navigate('/admin/dashboard');
        } else {
            alert('Username atau password salah!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <div className="size-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg border border-slate-50 p-2 flex items-center justify-center">
                        <img src="https://uploads.onecompiler.io/43w9rf9r9/44brtpuy2/image_2026-01-27_002804190.png" alt="Logo" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900">Admin Login</h1>
                    <p className="text-slate-500 text-sm mt-2">Masuk untuk mengelola konten desa.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                    >
                        Masuk
                    </button>
                </form>
                <div className="mt-8 text-center border-t border-slate-50 pt-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Kembali ke Website
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
