
import React from 'react';
import { BENEFITS } from '../constants';

const Benefits: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative group perspective-1000">
            <div className="w-full aspect-square rounded-[3rem] overflow-hidden bg-indigo-50 flex items-center justify-center p-12 relative z-10 transition-transform duration-700 group-hover:rotate-y-12 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
                alt="Butterfly Pea"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-100 rounded-full -z-10 blur-2xl animate-blob"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-100 rounded-full -z-10 blur-2xl animate-blob animation-delay-2000"></div>
          </div>
          <div className="animate-reveal">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
              Keajaiban Alami <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Bunga Telang</span>
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Bunga telang kaya akan senyawa antosianin yang disebut ternatin, yang memberi warna biru pada bunganya. Studi menunjukkan ternatin dapat mengurangi peradangan dan mengandung antioksidan tinggi yang bermanfaat bagi tubuh.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Kaemphferol', desc: 'Senyawa yang diyakini dapat membantu membunuh sel kanker berdasarkan penelitian laboratorium.' },
                { title: 'Asam p-Coumaric', desc: 'Memiliki efek anti-inflamasi, antimikroba, dan antivirus yang melindungi tubuh.' },
                { title: 'Delphinidin-3,5-glukosida', desc: 'Membantu merangsang sistem kekebalan tubuh secara alami.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-default group">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0 mt-1 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-green-600 text-lg">check_circle</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-16 animate-reveal animation-delay-500">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Khasiat Utama Untuk Anda</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, idx) => (
            <div key={benefit.id} className="group p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:bg-slate-50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-default animate-reveal" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className={`w-16 h-16 rounded-2xl ${benefit.color} flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {/* Note: using simple mapping for icons if we wanted to switch complexity, currently using fontawesome classes blindly, but let's assume material symbols for consistency if possible, or stick to provided icon string if it works with logic. The original code used <i> tags with provided classes. I will keep that logic but maybe wrap it differently. */}
                <i className={`fas ${benefit.icon}`}></i>
              </div>
              <h3 className="text-xl font-black mb-4 text-slate-900">{benefit.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
          <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 transition-colors animate-reveal" style={{ animationDelay: '600ms' }}>
            <span className="material-symbols-outlined text-4xl text-indigo-300 mb-6">local_cafe</span>
            <h3 className="text-xl font-black mb-2 text-slate-900">Cara Konsumsi</h3>
            <p className="text-slate-500 text-sm mt-2">Seduh 5-10 kelopak bunga kering dalam air panas, tunggu 5 menit hingga biru pekat, tambahkan madu atau lemon untuk rasa terbaik.</p>
          </div>
        </div>

        <div className="mt-24 text-center pb-8 border-t border-slate-50 pt-12">
          <p className="text-slate-400 text-sm italic max-w-2xl mx-auto flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Konsultasikan dengan dokter sebelum konsumsi berlebih, terutama bagi ibu hamil, menyusui, atau memiliki kondisi kesehatan tertentu.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Benefits;
