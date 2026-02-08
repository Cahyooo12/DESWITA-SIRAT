import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { CartItem, Product } from '../types';

interface ShopProps {
  cart: CartItem[];
  onAddToCart: (p: Product) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
}

// ... (ProductDetailModal and CheckoutModal remain unchanged for now, assumed to be using passed props)

const ProductDetailModal: React.FC<{ product: Product; isOpen: boolean; onClose: () => void; onAddToCart: (p: Product) => void }> = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white md:text-slate-500 md:bg-white md:shadow-md flex items-center justify-center hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative bg-slate-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-xs font-black uppercase tracking-widest text-primary shadow-sm">
              {product.category === 'Drink' ? 'Minuman' : product.category === 'Care' ? 'Perawatan' : 'Bibit'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 md:p-10 flex flex-col overflow-y-auto bg-white">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2 tracking-tight">{product.name}</h2>
            <p className="text-2xl font-black text-primary">Rp{product.price.toLocaleString()}</p>
          </div>

          <div className="space-y-8 flex-1">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">description</span> Deskripsi
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {product.ingredients && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">ecg_heart</span> Bahan Baku
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{product.ingredients}</p>
                </div>
              )}

              {product.usage && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">local_cafe</span> Saran Penyajian
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{product.usage}</p>
                </div>
              )}
            </div>

            {product.size && (
              <div className="flex items-center gap-3 text-slate-500 font-bold text-sm bg-slate-50 p-3 rounded-xl w-fit">
                <span className="material-symbols-outlined">inventory_2</span>
                <span>Kemasan: {product.size}</span>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full py-5 bg-primary text-white rounded-2xl font-black text-base uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">add_shopping_cart</span>
              Masukkan Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutModal: React.FC<{ isOpen: boolean; onClose: () => void; cart: CartItem[]; totalPrice: number }> = ({ isOpen, onClose, cart, totalPrice }) => {
  const [formData, setFormData] = useState({ name: '', address: '', note: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Halo Desa Wisata Bunga Telang, saya ingin memesan:\n\n` +
      `Data Pemesan:\n` +
      `Nama: ${formData.name}\n` +
      `Alamat: ${formData.address}\n` +
      `Catatan: ${formData.note || '-'}\n\n` +
      `Pesanan:\n` +
      cart.map(item => `- ${item.name} (${item.quantity}x) - Rp${(item.price * item.quantity).toLocaleString()}`).join('\n') +
      `\n\nTotal: Rp${totalPrice.toLocaleString()}\n\nMohon informasi pembayarannya. Terima kasih!`
    );
    window.open(`https://wa.me/6285229312990?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95">
        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">assignment</span>
          Data Pemesanan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              placeholder="Masukkan nama Anda"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Pengiriman</label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none"
              placeholder="Masukkan alamat lengkap..."
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Catatan (Opsional)</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              placeholder="Tambahan catatan pesanan"
              value={formData.note}
              onChange={e => setFormData({ ...formData, note: e.target.value })}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-[2] py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all"
            >
              Lanjut ke WhatsApp <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Shop: React.FC<ShopProps> = ({ cart, onAddToCart, onUpdateQuantity }) => {
  const { products } = useData();
  const [filter, setFilter] = useState<'All' | 'Drink' | 'Care' | 'Seed'>('All');
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { id: 'All', label: 'Semua', icon: 'storefront' },
    { id: 'Drink', label: 'Minuman', icon: 'local_cafe' },
    { id: 'Care', label: 'Perawatan', icon: 'spa' },
    { id: 'Seed', label: 'Bibit', icon: 'grass' },
  ] as const;

  return (
    <div className="bg-[#faf9fc] min-h-screen font-sans">
      {/* Header Banner - More compact and modern */}
      <section className="relative w-full h-[300px] md:h-[350px] flex items-center justify-center overflow-hidden mb-8 md:mb-12 rounded-b-[2.5rem] shadow-sm mx-auto max-w-[1440px]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-purple-900/80 to-primary/90 mix-blend-multiply z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594631252845-29fc458681b3?auto=format&fit=crop&q=80&w=1200')" }}
          ></div>
        </div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-4 animate-reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Official Community Store
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Oleh-Oleh Khas <br /><span className="text-purple-200">Dusun Sirat</span>
          </h1>
          <p className="text-purple-100 text-sm md:text-base font-medium max-w-xl leading-relaxed">
            Produk olahan bunga telang asli, dipetik dan diolah langsung oleh warga desa dengan penuh cinta.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-24 flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* Category Navigation - Sticky Horizontal on Mobile, Sidebar on Desktop */}
        <aside className="lg:w-64 flex-shrink-0 sticky top-20 z-40 lg:z-0 -mx-4 px-4 lg:mx-0 lg:px-0 bg-[#faf9fc]/95 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none py-2 lg:py-0">
          <div className="lg:sticky lg:top-24 space-y-6">

            {/* Mobile: Horizontal Scroll, Desktop: Vertical List */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar snap-x">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`flex-shrink-0 snap-start px-5 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-sm transition-all flex items-center gap-3 group border ${filter === cat.id
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25 translate-y-0 lg:translate-x-2'
                    : 'bg-white border-slate-100 text-slate-500 hover:border-primary/30 hover:text-primary hover:shadow-md'
                    }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${filter === cat.id ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
                    {cat.icon}
                  </span>
                  <span className="whitespace-nowrap">{cat.label}</span>
                  {filter === cat.id && <span className="material-symbols-outlined ml-auto text-sm hidden lg:block">chevron_right</span>}
                </button>
              ))}
            </div>

            {/* Promo Card - Desktop Only */}
            <div className="hidden lg:block purple-gradient rounded-3xl p-6 text-white relative overflow-hidden shadow-xl group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
              <span className="material-symbols-outlined text-4xl mb-3 opacity-80">local_offer</span>
              <h3 className="text-xl font-black mb-2 leading-tight">Paket Hemat Wisata!</h3>
              <p className="text-white/80 text-xs mb-4 leading-relaxed line-clamp-3">Dapatkan diskon spesial untuk pembelian bundle tiket wisata + produk olahan.</p>
              <div className="h-1 w-12 bg-white/30 rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">grid_view</span>
              {filter === 'All' ? 'Semua Produk' : categories.find(c => c.id === filter)?.label}
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
              {filteredProducts.length} Item
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[2rem] p-3 md:p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Image Area */}
                <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs md:text-sm font-black text-slate-900 shadow-sm border border-white/50">
                    Rp{product.price.toLocaleString()}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="absolute bottom-3 right-3 size-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-90"
                    title="Tambah ke Keranjang"
                  >
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-grow px-1">
                  <div className="mb-2">
                    <span className="text-[9px] font-bold text-primary/80 uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md inline-block mb-2">
                      {product.category === 'Drink' ? 'Minuman' : product.category === 'Care' ? 'Perawatan' : 'Bibit'}
                    </span>
                    <h3 className="text-base md:text-lg font-black text-slate-800 leading-tight mb-1 line-clamp-2" title={product.name}>
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>

                  {/* Footer Stats / Action */}
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-3 mt-auto">
                    <div className="flex items-center gap-1.5 text-slate-400" title="Ukuran/Kemasan">
                      <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                      <span className="text-[10px] font-bold truncate max-w-[80px]">{product.size?.split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                    {/* Mobile Only Add Button (Visible always on mobile since hover doesn't exist) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="lg:hidden text-primary text-xs font-black uppercase tracking-wider bg-primary/5 px-3 py-1.5 rounded-lg active:bg-primary active:text-white transition-colors"
                    >
                      + Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        totalPrice={cartTotal}
      />

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 md:p-8 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Keranjang</h2>
                <p className="text-slate-500 text-xs font-medium">{totalItems} item dipilih</p>
              </div>
              <button onClick={() => setShowCart(false)} className="size-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <div className="size-24 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-4xl opacity-30">shopping_cart_off</span>
                  </div>
                  <p className="text-lg font-bold text-slate-600">Keranjang Kosong</p>
                  <button onClick={() => setShowCart(false)} className="text-primary text-sm font-bold hover:underline">Mulai Jelajahi Produk</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-2xl border border-slate-50 bg-slate-50/50 hover:border-primary/10 transition-colors group">
                    <div className="size-20 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 line-clamp-2">{item.name}</h4>
                        <p className="text-primary font-black text-sm">Rp{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="size-6 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-50"><span className="material-symbols-outlined text-sm">remove</span></button>
                          <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="size-6 rounded-md flex items-center justify-center text-primary bg-primary/5 hover:bg-primary hover:text-white transition-colors"><span className="material-symbols-outlined text-sm">add</span></button>
                        </div>
                        <span className="text-slate-400 text-[10px] font-medium">Rp{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 md:p-8 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sticky bottom-0 z-10">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-slate-500 font-bold text-sm">Total Estimasi</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tight">Rp{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-xl">chat</span> Pesan via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toggle */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-10 right-10 size-20 purple-gradient text-white rounded-3xl shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">shopping_bag</span>
        {cart.length > 0 && (
          <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-black size-8 rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-bounce">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        )}
      </button>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Shop;
