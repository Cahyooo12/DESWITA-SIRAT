
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Story from './pages/Story';
import Benefits from './pages/Benefits';
import About from './pages/About';
import Preloader from './components/Preloader';
import { DataProvider } from './contexts/DataContext';
import { CartItem } from './types';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import ProductList from './pages/Admin/Shop/ProductList';
import ProductForm from './pages/Admin/Shop/ProductForm';
import EventList from './pages/Admin/Events/EventList';
import EventForm from './pages/Admin/Events/EventForm';
import NewsList from './pages/Admin/News/NewsList';
import NewsForm from './pages/Admin/News/NewsForm';

const Navbar: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Wisata', path: '/story' },
    { name: 'Manfaat', path: '/benefits' },
    { name: 'Tentang', path: '/about' },
  ];

  // Pages that should have a transparent navbar at the top (because they have a dark hero section)
  const transparentPaths = ['/', '/shop', '/about'];
  const isTransparent = transparentPaths.includes(location.pathname) && !scrolled;

  return (
    <div className={`fixed top-0 z-50 w-full transition-all duration-500 ${!isTransparent
      ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-slate-100 text-slate-800'
      : 'bg-transparent py-6 border-b border-transparent text-white'
      }`}>
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`size-10 flex items-center justify-center rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 overflow-hidden ${!isTransparent ? 'bg-white' : 'bg-white/20 backdrop-blur-md'}`}>
            <img src="https://uploads.onecompiler.io/43w9rf9r9/44brtpuy2/image_2026-01-27_002804190.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className={`hidden md:block text-lg font-bold leading-tight tracking-tight ${!isTransparent ? 'text-[#151018]' : 'text-white'}`}>
            Desa Wisata<br /><span className={!isTransparent ? 'text-primary' : 'text-white/80'}>Bunga Telang</span>
          </h2>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const textColor = !isTransparent ? (isActive ? 'text-primary' : 'text-[#795e8d] hover:text-primary') : (isActive ? 'text-white' : 'text-white/80 hover:text-white');

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-all duration-300 ${isActive ? 'scale-105' : ''} ${textColor}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Admin Login Link in Header */}
          <Link to="/admin/login" className={`flex items-center justify-center size-10 rounded-full transition-all relative ${!isTransparent
            ? 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-primary'
            : 'bg-white/10 backdrop-blur-md text-white/80 hover:bg-white/20 hover:text-white'
            }`} title="Admin Login">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </Link>

          <Link to="/shop" className={`flex items-center justify-center size-10 rounded-full transition-all relative ${!isTransparent
            ? (location.pathname === '/shop' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-200')
            : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
            }`}>
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[#151018]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full transition-all duration-500 transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}>
        <div className="mx-6 mt-4 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border border-slate-100">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold p-4 rounded-xl transition-all ${location.pathname === link.path ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="text-slate-600 hover:bg-slate-50 text-sm font-bold p-4 rounded-xl transition-all"
            >
              Admin Login
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="bg-primary/10 text-primary p-4 rounded-xl text-center font-bold"
            >
              Belanja Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#f3f0f5] py-20 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-primary font-bold text-2xl">
            <img src="https://uploads.onecompiler.io/43w9rf9r9/44brtpuy2/image_2026-01-27_002804190.png" alt="Logo" className="size-10 rounded-xl object-cover shadow-sm bg-white" />
            Desa Wisata Bunga Telang
          </div>
          <p className="text-[#795e8d] text-base max-w-sm leading-relaxed">
            Menghadirkan keindahan alam, kearifan lokal, dan produk olahan bunga telang terbaik untuk Anda. Mari berkunjung dan rasakan ketenangannya di Dusun Sirat.
          </p>
          <div className="flex gap-4">
            {['instagram', 'facebook', 'whatsapp'].map(social => (
              <a key={social} href="#" className="size-11 rounded-2xl bg-slate-50 flex items-center justify-center text-[#795e8d] hover:bg-primary hover:text-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-[#151018] mb-6 tracking-tight">Navigasi</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-[#795e8d] text-sm hover:text-primary transition-colors">Tentang Kami</Link></li>
            <li><Link to="/shop" className="text-[#795e8d] text-sm hover:text-primary transition-colors">Produk Desa</Link></li>
            <li><Link to="/story" className="text-[#795e8d] text-sm hover:text-primary transition-colors">Wisata & Berita</Link></li>
            <li><Link to="/benefits" className="text-[#795e8d] text-sm hover:text-primary transition-colors">Manfaat Kesehatan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#151018] mb-6 tracking-tight">Kontak Lokasi</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-[#795e8d] text-sm">
              <span className="material-symbols-outlined text-primary text-xl">map</span>
              <span>Dusun Sirat, Sidomulyo, Kec. Bambanglipuro, Bantul, Yogyakarta</span>
            </div>
            <div className="flex items-center gap-3 text-[#795e8d] text-sm">
              <span className="material-symbols-outlined text-primary text-xl">call</span>
              <span>+62 852 2931 2990</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-20 pt-10 border-t border-[#f3f0f5] flex flex-col md:flex-row justify-between items-center gap-4 text-[#795e8d] text-xs font-bold uppercase tracking-widest">
        <p>© 2024 Desa Wisata Bunga Telang. Community Pride.</p>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, qty) } : i).filter(i => i.quantity > 0));
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      <div className={`flex flex-col min-h-screen transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {!isAdmin && <Navbar cartCount={totalItems} />}
        <main className={isAdmin ? '' : 'flex-grow'}>
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/shop" element={<Shop cart={cart} onAddToCart={addToCart} onUpdateQuantity={updateQuantity} />} />
            <Route path="/story" element={<Story />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/about" element={<About />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/products/new" element={<ProductForm />} />
              <Route path="/admin/products/edit/:id" element={<ProductForm />} />
              <Route path="/admin/events" element={<EventList />} />
              <Route path="/admin/events/new" element={<EventForm />} />
              <Route path="/admin/events/edit/:id" element={<EventForm />} />
              <Route path="/admin/news" element={<NewsList />} />
              <Route path="/admin/news/new" element={<NewsForm />} />
              <Route path="/admin/news/edit/:id" element={<NewsForm />} />
            </Route>
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <ScrollToTop />
        <AppContent />
      </HashRouter>
    </DataProvider>
  );
};

export default App;
