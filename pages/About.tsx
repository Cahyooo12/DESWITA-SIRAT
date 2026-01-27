
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Sub-section */}
      <section className="relative w-full h-[500px] flex flex-col items-center justify-center p-8 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpSVMAHRO9A2abT1PG_pLO_ogoqUkGk3BsxuUFlANadTQMUQWTSYlRFXXn59x_gL1Jx_d1gGCslXQDRzW_nu1J9-nP3CKvr40QeNgpC1NCKa1sKTpTKLcWIbNKGtoscsPD_gDP6ZqlHhS8ZQOaSagOa2fVDHoJVjwcP8KqfBdOWPvlctBGdx5CR93m4eUWfC2q-nuKEvJsdUfBmWXqlFrWiW5amYjIxflI6ipbFII0T5jT3Zxc9hBYMVhjAM5KpXt7u7lj-vpYsk8")' }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center max-w-4xl px-6 animate-reveal">
          <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter text-shadow-md">Tentang Dusun Sirat</h1>
          <p className="text-white text-lg md:text-2xl font-medium leading-relaxed drop-shadow-lg opacity-90">
            Menemukan keindahan alam, kedamaian, dan kearifan lokal yang otentik di jantung Desa Wisata Bunga Telang, Bantul, Yogyakarta.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Stats Grid */}
        <section className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Tahun Berdiri', val: '2018', icon: 'flag' },
              { label: 'Wisatawan/Thn', val: '5k+', icon: 'groups' },
              { label: 'Produk Lokal', val: '25+', icon: 'shopping_basket' },
              { label: 'Warga Terlibat', val: '150+', icon: 'diversity_3' }
            ].map(stat => (
              <div key={stat.label} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-50 flex flex-col gap-3 hover:shadow-xl transition-all group">
                <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
              <span className="material-symbols-outlined text-base">history_edu</span> Sejarah Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">Dari Pekarangan <br /> Menjadi Kebanggaan</h2>
            <div className="space-y-6 text-[#795e8d] text-lg leading-relaxed">
              <p>Berawal dari keinginan warga Dusun Sirat untuk melestarikan tanaman lokal yang tumbuh liar di pekarangan, kami mulai membudidayakan Bunga Telang secara serius pada tahun 2018.</p>
              <p>Melalui semangat gotong royong, kami mengubah lahan tidur menjadi kebun edukasi yang kini menjadi jantung ekonomi kreatif desa, memberdayakan ratusan ibu-ibu dan pemuda setempat.</p>
            </div>
          </div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group h-[500px]">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuApBQYRjhPfgltgTCcsdRGj7FrfN_Grh2ZHi9YIjzCGHm11aEwNm2T4UBZTqSw8tvJWlK-9qKOCbaFSRrw1hTU6TCuk01QaUD0D6AgNzhOvCDKJy98atgIUPoFGk8PDyr_iW4cAmbZDzj42au0ggEa5ZcKLfzW0JyUMDPO664iWBzRHLDaUt0yDN_KZwrIr9WG9Y4iebsoFWp94aaQTqpZqMuCvzVBHcr3dU1y2XL1qqvDRy-E1rU9vzG-Ct0y5EZilWjy-mfzHjAQ" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 p-6 glass-panel rounded-2xl border-white/20">
              <p className="text-white font-black italic">"Kemandirian ekonomi desa lahir dari cinta pada alam sendiri."</p>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="py-24">
          <h2 className="text-3xl font-black text-center mb-16 tracking-tight">Pilar Komunitas Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                t: 'Eko-Wisata',
                d: 'Menjaga kelestarian alam desa dengan meminimalkan dampak lingkungan dari setiap aktivitas wisata.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3W9H23znHjNQ4YrUcYM9ZOSEU-DXDfTwY7pe3AlyntJgdExx4QUyEYbPmuzaw4OlhOybTLsvKId1VWg5EYfEssjWtxTj5RaWXi8tD-KFMWIXkjT-wlqsoTRE9xhabHdK1m4QvjaFqQCzI1jdv22McPKecF9WGXfGWfHD8H_Qp6XEDB374yuDxw_v06vyWBQtXX6yk0yV_gnTU2cSqbKGvyzatcgLRsJ9lmZWdKRm2EvF8gx9IwkvCnyVtvqak6s5bxN6hHKdE588'
              },
              {
                t: 'Pemberdayaan',
                d: 'Menciptakan lapangan kerja bagi warga lokal melalui produksi UMKM dan layanan pariwisata terpadu.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa7QMqGPwKTfuPuW5qgMuDPHW0X7RRVSqndbDkdysJoLUUjmrk9yY8TTrIeIppXAUY0ptaWfH8YsYrE_J0o6VxJYxpkt1yAZafZV_v2m0UY4rc-jGeD17NrEhfNESfgZ-uZK8z7n5BEfIQfqf9GlFsvlQ4jhcg6CWMNHlLNYJyanXeBoxjp802Q9elRJUdVTEIs9pDzouNuF3_uKTGA2QcAW7eni460MYHNd4gvlkyClDDZGGnIoPY1Qqke6Jxh2YAI7uN6NgG__s'
              },
              {
                t: 'Kearifan Lokal',
                d: 'Memperkenalkan tradisi leluhur dalam pengolahan herbal agar tetap hidup di era modernisasi.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPyn2ZdKqLC2RY2ODPDmQbnKpHIuS3l2XfJNac4NY_bQHAI8ZkVM4Tfu0nUSvD0KhrxBlv8ZPR-T5oCWlLNX2zQXm48iy6yQaZzurAhpaDx0HVvMVtFrGWyoBJ6Ls4APLIqma_ddufiMtH8uVoKUhyYXR3RutqsQ8SBeikv9hn4XEnwF3LMUa94q6Cq1ePIne01edimjVSzGiRmHfdtF3MaSuqsAvrjjo3Aqfjw8YTmRJLyNGgAVAiEyecUnRjAaqJgRZ7OYlbPyI'
              }
            ].map(p => (
              <div key={p.t} className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-50 hover:shadow-2xl transition-all duration-500 group">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                  <img src={p.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">{p.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
