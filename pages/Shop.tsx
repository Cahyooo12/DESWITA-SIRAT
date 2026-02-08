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
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'usage'>('desc');
  const [selectedImage, setSelectedImage] = useState<string>(product.images?.[0] || product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || product.size || '');
  const [quantity, setQuantity] = useState(1);

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || product.image);
      setSelectedSize(product.sizes?.[0] || product.size || '');
      setActiveTab('desc');
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[90vh] animate-in zoom-in-95 duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white md:text-slate-500 md:bg-white md:shadow-md flex items-center justify-center hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* LEFT: Image Gallery */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col gap-4">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-sm flex-1">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-xs font-black uppercase tracking-widest text-primary shadow-sm border border-white/50">
                {product.category === 'Drink' ? 'Minuman' : product.category === 'Care' ? 'Perawatan' : 'Bibit'}
              </span>
            </div>
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 size-20 rounded-xl overflow-hidden border-2 transition-all snap-start ${selectedImage === img ? 'border-primary ring-2 ring-primary/20 scale-95' : 'border-slate-200 hover:border-primary/50'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Content Section */}
        <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto bg-white">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2 tracking-tight">{product.name}</h2>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black text-primary">Rp{product.price.toLocaleString()}</p>
              <div className="flex text-yellow-400 text-sm">
                {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-[18px] fill-current">star</span>)}
                <span className="text-slate-400 font-bold ml-1 text-xs mt-0.5">(12 Ulasan)</span>
              </div>
            </div>
          </div>

          {/* Variants / Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Varian Ukuran</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl border font-bold text-sm transition-all ${selectedSize === size
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20 transform scale-105'
                      : 'border-slate-200 text-slate-600 hover:border-primary/50 hover:bg-slate-50'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-100 mb-6">
            {[
              { id: 'desc', label: 'Deskripsi' },
              { id: 'ingredients', label: 'Manfaat', disabled: !product.ingredients },
              { id: 'usage', label: 'Cara Penyajian', disabled: !product.usage }
            ].map(tab => (
              !tab.disabled && (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-0 py-3 mr-6 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {tab.label}
                </button>
              )
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-h-[100px]">
            {activeTab === 'desc' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </div>
            )}
            {activeTab === 'ingredients' && product.ingredients && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                  <p className="text-slate-700 leading-relaxed font-medium">{product.ingredients}</p>
                </div>
              </div>
            )}
            {activeTab === 'usage' && product.usage && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                  <p className="text-slate-700 leading-relaxed font-medium">{product.usage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4 items-center">
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="size-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-primary transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="font-black text-slate-900 w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="size-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  onAddToCart({ ...product, size: selectedSize });
                }
                onClose();
              }}
              className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-base uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
              Tambah ke Keranjang
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

const CartModal: React.FC<{ isOpen: boolean; onClose: () => void; cart: CartItem[]; onUpdateQuantity: (id: string, qty: number) => void }> = ({ isOpen, onClose, cart, onUpdateQuantity }) => {
  const [formData, setFormData] = useState({ name: '', address: '', note: '' });
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
      `\n\nTotal: Rp${total.toLocaleString()}\n\nMohon informasi pembayarannya. Terima kasih!`
    );
    window.open(`https://wa.me/6285229312990?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-[#f8f7fa] rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Keranjang Belanja Anda</h2>
            <p className="text-slate-500 text-xs text-base">Periksa kembali pesanan produk lokal Anda sebelum checkout.</p>
          </div>
          <button onClick={onClose} className="size-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* LEFT: Cart Items */}
            <div className="w-full lg:flex-[3] space-y-4">
              {cart.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm">
                  <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-4xl text-slate-300">shopping_cart_off</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Keranjang Kosong</h3>
                  <button onClick={onClose} className="text-primary font-bold text-sm hover:underline">Mulai Belanja</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 md:gap-6">
                    <div className="size-20 md:size-24 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1 truncate">{item.name}</h4>
                      <p className="hidden md:block text-slate-500 text-xs mb-2">Stok tersedia</p>
                      <p className="text-slate-900 font-bold text-base md:text-xl">Rp{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="size-8 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm text-slate-600 transition-all font-bold disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="size-8 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm text-slate-900 transition-all font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="size-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT: Delivery Details */}
            <div className="w-full lg:flex-[2] bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-lg lg:sticky lg:top-0">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Detail Pengiriman</h3>
              <p className="text-slate-500 text-xs mb-6">Lengkapi data untuk estimasi ongkir via WhatsApp.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1">Nama Lengkap</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="Masukkan nama anda"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1">Alamat Pengiriman</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium resize-none"
                    placeholder="Masukkan alamat lengkap..."
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  ></textarea>
                </div>

                <div className="py-4 border-t border-slate-50 space-y-2">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} item)</span>
                    <span className="font-bold text-slate-900">Rp{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 items-center">
                    <span>Estimasi Ongkir</span>
                    <span className="text-[10px] italic text-slate-400">Dihitung via WA</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-primary pt-2 mt-2 border-t border-dashed border-slate-200">
                    <span>Total</span>
                    <span>Rp{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full py-4 bg-primary hover:bg-[#3a0066] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Beli via WhatsApp
                </button>
                <p className="text-[10px] text-center text-slate-400 leading-tight px-4">
                  Transaksi aman & terpercaya langsung dengan pengelola desa.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const Shop: React.FC<ShopProps> = ({ cart, onAddToCart, onUpdateQuantity }) => {
  const { products } = useData();
  const [filter, setFilter] = useState<'All' | 'Drink' | 'Care' | 'Seed'>('All');
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

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

        {/* Category Navigation */}
        <aside className="lg:w-64 flex-shrink-0 sticky top-20 z-40 lg:z-0 -mx-4 px-4 lg:mx-0 lg:px-0 bg-[#faf9fc]/95 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none py-2 lg:py-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar snap-x">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`flex-shrink-0 snap-start px-5 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-sm transition-all flex items-center gap-3 group border ${filter === cat.id
                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                    : 'bg-white border-slate-100 text-slate-500 hover:border-primary/30 hover:text-primary hover:shadow-sm hover:bg-slate-50'
                    }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${filter === cat.id ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
                    {cat.icon}
                  </span>
                  <span className="whitespace-nowrap">{cat.label}</span>
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
                    src={product.images?.[0] || product.image || ''}
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
                    {/* Mobile Only Add Button */}
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

      {/* Unified Cart Modal */}
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        cart={cart}
        onUpdateQuantity={onUpdateQuantity}
      />

      {/* Floating Cart Trigger */}
      <button
        onClick={() => setShowCartModal(true)}
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
