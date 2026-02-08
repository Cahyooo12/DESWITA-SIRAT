import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import EventScheduleModal from '../components/EventScheduleModal';

const Story: React.FC = () => {
  const { articles } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const categories = [
    { name: 'Events & Festival', count: 0 },
    { name: 'Produk & UMKM', count: articles.filter(a => a.category === 'Produk & UMKM').length },
    { name: 'Kisah Komunitas', count: articles.filter(a => a.category === 'Kisah Komunitas').length },
    { name: 'Tips Kesehatan', count: 0 }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const otherArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  return (
    <div className="pt-24 pb-32 bg-background-light min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 space-y-6 pt-12 animate-reveal">
          <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#795e8d]">
            <a href="/" className="hover:text-primary transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-primary">Berita & Cerita Desa</span>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Kabar & <span className="text-primary">Kegiatan Desa</span>
            </h1>
            <p className="text-xl text-[#795e8d] max-w-2xl font-medium leading-relaxed">
              Ikuti perkembangan terbaru, kisah sukses UMKM, dan kegiatan seru dari Desa Wisata Bunga Telang.
            </p>
          </div>
        </div>

        {/* Main Grid: Feed + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Feed (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-12">

            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">search_off</span>
                <h3 className="text-xl font-bold text-slate-500">Tidak ada artikel ditemukan</h3>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                  className="mt-4 text-primary font-bold hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                {/* Featured Article - only show if search/filter doesn't exclude specific matches drastically, or just show first match as featured */}
                {featuredArticle && (
                  <article className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-100 flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                      <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">
                        {featuredArticle.category || 'Kisah Utama'}
                      </div>
                    </div>
                    <div className="p-10 md:p-14 flex flex-col gap-6">
                      <div className="flex items-center gap-4 text-xs font-black text-[#795e8d] uppercase tracking-widest">
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">calendar_month</span> {featuredArticle.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">visibility</span> {featuredArticle.views} Views</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight tracking-tighter">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-slate-500 text-lg leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                      <a href={featuredArticle.url} target="_blank" className="flex items-center gap-3 text-primary font-black uppercase text-sm tracking-widest mt-4">
                        Baca Kisah Selengkapnya <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-2">east</span>
                      </a>
                    </div>
                  </article>
                )}

                {/* Standard Feed Grid */}
                {otherArticles.length > 0 && (
                  <div className="grid grid-cols-1 gap-8">
                    {otherArticles.map(article => (
                      <article key={article.id} className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-50 flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-56 h-48 rounded-2xl overflow-hidden shrink-0">
                          <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{article.date}</span>
                            {article.category && <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-wider">{article.category}</span>}
                          </div>
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                            {article.title}
                          </h3>
                          <p className="text-[#795e8d] text-sm line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                          <a href={article.url} target="_blank" className="text-primary font-black uppercase text-[10px] tracking-widest mt-2 flex items-center gap-2">Baca Cerita <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>

          {/* Sidebar (Right) */}
          <aside className="lg:col-span-4 flex flex-col gap-10">
            {/* Search Widget */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h4 className="text-lg font-black text-slate-900 mb-6 tracking-tight">Cari Berita</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 rounded-2xl border-slate-100 bg-slate-50 px-6 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button className="absolute right-2 top-2 size-10 rounded-xl bg-primary text-white flex items-center justify-center hover:brightness-110">
                  <span className="material-symbols-outlined text-lg">search</span>
                </button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h4 className="text-lg font-black text-slate-900 mb-6 tracking-tight">Kategori</h4>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 group transition-all text-left ${selectedCategory === null ? 'bg-slate-50 ring-2 ring-primary/10' : ''}`}
                >
                  <span className={`font-bold text-sm ${selectedCategory === null ? 'text-primary' : 'text-slate-600'}`}>Semua Kategori</span>
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
                    className={`flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 group transition-all text-left ${selectedCategory === cat.name ? 'bg-slate-50 ring-2 ring-primary/10' : ''}`}
                  >
                    <span className={`font-bold text-sm ${selectedCategory === cat.name ? 'text-primary' : 'text-slate-600 group-hover:text-primary'}`}>{cat.name}</span>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-slate-100 text-[#795e8d] group-hover:bg-primary/10 group-hover:text-primary'}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Sidebar */}
            <div className="purple-gradient rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 size-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <span className="material-symbols-outlined text-4xl mb-6 text-purple-200">festival</span>
              <h4 className="text-2xl font-black mb-4 leading-tight">Ikuti Festival Dusun Sirat!</h4>
              <p className="text-white/70 text-sm leading-relaxed mb-8">Jangan lewatkan, pantau terus jadwal keseruan di Dusun Sirat!</p>
              <button
                onClick={() => setShowSchedule(true)}
                className="w-full py-4 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:translate-y-1 transition-transform"
              >
                Jadwal Acara
              </button>
            </div>
          </aside>
        </div>
      </div>
      <EventScheduleModal isOpen={showSchedule} onClose={() => setShowSchedule(false)} />
    </div>
  );
};

export default Story;
