import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Article } from '../types';

const StoryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { articles } = useData();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            const found = articles.find(a => a.id === id);
            setArticle(found || null);
        }
    }, [id, articles]);

    if (!article) return null; // Or loading state

    // Get recent articles for sidebar (exclude current)
    const recentArticles = articles
        .filter(a => a.id !== article.id)
        .slice(0, 3);

    // Calculate real-time category counts
    const categoryCounts = articles.reduce((acc, article) => {
        const cat = article.category || 'Umum';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Define categories to show (can be static list with dynamic counts, or fully dynamic keys)
    const categories = [
        { name: 'Produk & UMKM', count: categoryCounts['Produk & UMKM'] || 0 },
        { name: 'Kisah Komunitas', count: categoryCounts['Kisah Komunitas'] || 0 },
        { name: 'Tips Kesehatan', count: categoryCounts['Tips Kesehatan'] || 0 },
        { name: 'Events & Festival', count: categoryCounts['Events & Festival'] || 0 }
    ].sort((a, b) => b.count - a.count); // Sort by most popular

    const paragraphs = article.content ? article.content.split('\n').filter(p => p.trim() !== '') : [];

    return (
        <div className="pt-32 pb-20 bg-[#FAFAFA] min-h-screen font-sans text-slate-800">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Content (Left) */}
                <div className="lg:col-span-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.15] mb-6">
                            {article.title}
                        </h1>

                        <div className="flex items-center justify-between border-y border-slate-200 py-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-200 overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=Admin+Desa&background=random" alt="Admin" />
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-slate-900">Admin Desa <span className="text-green-500 text-[10px] align-middle material-symbols-outlined">verified</span></p>
                                    <p className="text-slate-500">{article.date} • {article.views} Views</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="size-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined text-lg">bookmark</span></button>
                                <button className="size-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined text-lg">share</span></button>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="rounded-2xl overflow-hidden mb-10 shadow-sm">
                        <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
                        <p className="text-xs text-slate-400 mt-2 text-center italic">Dokumentasi: Desa Wisata Bunga Telang</p>
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:leading-loose prose-a:text-primary">
                        <p className="lead text-xl text-slate-600 font-serif italic mb-8">
                            {article.excerpt}
                        </p>

                        {article.content ? (
                            <div className="space-y-6">
                                {/* Simulated drop cap for first paragraph if needed, or just standard */}
                                {paragraphs.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl text-center">
                                <p className="mb-4">Artikel ini memuat konten dari sumber eksternal.</p>
                                {article.url && (
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:brightness-110 transition-all">
                                        Baca Selengkapnya <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Quote Block from Quote or Excerpt */}
                        {(article.quote || article.excerpt) && (
                            <div className="my-10 p-8 bg-purple-50 border-l-4 border-primary rounded-r-xl">
                                <p className="font-serif text-xl italic text-slate-800 mb-4">
                                    "{article.quote || article.excerpt}"
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Tags / Footer */}
                    <div className="mt-12 flex gap-2 flex-wrap">
                        {article.category && (
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-200 cursor-pointer">#{article.category}</span>
                        )}
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-200 cursor-pointer">#DesaWisata</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-200 cursor-pointer">#BungaTelang</span>
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="lg:col-span-4 space-y-10">

                    {/* Categories */}
                    <div>
                        <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">category</span> Kategori Populer
                        </h3>
                        <div className="space-y-2">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group">
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">{cat.name}</span>
                                    <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">{cat.count} Articles</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent News */}
                    <div>
                        <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">newspaper</span> Berita Terbaru
                        </h3>
                        <div className="space-y-6">
                            {recentArticles.map(recent => (
                                <Link to={`/story/${recent.id}`} key={recent.id} className="flex gap-4 group">
                                    <div className="size-20 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                                        <img src={recent.image} alt={recent.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                            {recent.title}
                                        </h4>
                                        <span className="text-xs text-slate-400">{recent.date}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Link to="/story" className="w-full block py-3 text-center border border-slate-200 rounded-xl text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all">
                                Lihat Semua Berita
                            </Link>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default StoryDetail;
