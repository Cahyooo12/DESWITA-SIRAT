
import { Product, Article, Benefit } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Teh Telang Kemasan',
    price: 10000,
    description: 'Teh celup bunga telang praktis siap seduh.',
    category: 'Drink',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc458681b3?auto=format&fit=crop&q=80&w=400',
    ingredients: '100% Bunga Telang (Clitoria ternatea) pilihan yang dikeringkan.',
    usage: 'Seduh 1 kantong teh dalam 200ml air panas (80-90°C) selama 3-5 menit.',
    size: 'Isi 10 kantong teh celup (2g/kantong)'
  },
  {
    id: 'p2',
    name: 'Teh Telang Kering',
    price: 30000,
    description: 'Bunga telang utuh yang dikeringkan secara alami.',
    category: 'Drink',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400',
    ingredients: 'Kelopak bunga telang segar pilihan tanpa tambahan kimia.',
    usage: 'Masukkan 5-7 kuntum bunga kering ke dalam gelas, seduh dengan air panas.',
    size: 'Kemasan Zipper Bag 50 gram'
  },
  {
    id: 'p3',
    name: 'Sirup Bunga Telang',
    price: 20000,
    description: 'Sirup manis konsentrat dengan warna biru cantik.',
    category: 'Drink',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400',
    ingredients: 'Ekstrak bunga telang, gula pasir murni, air, dan perisa alami.',
    usage: 'Campurkan 2-3 sendok makan sirup ke dalam 200ml air dingin atau soda.',
    size: 'Botol Kaca 250 ml'
  },
  {
    id: 'p4',
    name: 'Sabun Batang Telang',
    price: 10000,
    description: 'Sabun alami untuk melembabkan kulit.',
    category: 'Care',
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400',
    ingredients: 'Minyak kelapa, ekstrak bunga telang, gliserin, dan minyak zaitun.',
    usage: 'Gunakan saat mandi, busakan pada seluruh tubuh, lalu bilas hingga bersih.',
    size: 'Batang 80 gram'
  },
  {
    id: 'p5',
    name: 'Sabun Cair Telang',
    price: 30000,
    description: 'Sabun cair lembut dengan manfaat anti-inflamasi.',
    category: 'Care',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c7e0?auto=format&fit=crop&q=80&w=400',
    ingredients: 'Aqua, ekstrak telang, potassium cocoate, aloe vera, dan vitamin E.',
    usage: 'Tuangkan pada telapak tangan atau puff mandi, aplikasikan pada kulit basah.',
    size: 'Botol Pump 250 ml'
  },
  {
    id: 'p6',
    name: 'Bibit Bunga Telang',
    price: 30000,
    description: 'Bibit tanaman telang berkualitas siap tanam.',
    category: 'Seed',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=400',
    ingredients: 'Biji bunga telang (Clitoria ternatea) varietas ungu tumpuk.',
    usage: 'Rendam biji dalam air hangat semalam, tanam pada media tanah subur.',
    size: 'Paket 20 butir biji unggul'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Warga Bantul Olah Bunga Telang Bernilai Ratusan Ribu',
    excerpt: 'Dianggap tanaman liar, warga Bantul berhasil mengubah bunga telang menjadi produk bernilai tinggi.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600',
    url: 'https://jogja.suara.com/read/2020/10/01/071442/dianggap-tanaman-liar-warga-bantul-olah-bunga-telang-bernilai-ratusan-ribu',
    views: '1.2k',
    date: '1 Okt 2020',
    category: 'Produk & UMKM'
  },
  {
    id: 'a2',
    title: "Usai Di-PHK, Pria Ini 'Sulap' Bunga Telang Jadi Sabun",
    excerpt: 'Kena PHK pandemi tidak membuat Danang putus asa. Ia mengolah bunga telang jadi teh dan sabun.',
    image: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=80&w=600',
    url: 'https://finance.detik.com/solusiukm/d-5195744/usai-di-phk-pria-ini-sulap-bunga-telang-jadi-sabun-hingga-teh',
    views: '2.5k',
    date: '30 Sep 2020',
    category: 'Kisah Komunitas'
  },
  {
    id: 'a3',
    title: 'Sekilo Bunga Telang Dihargai Rp500 Ribu',
    excerpt: 'Permintaan bunga telang kering semakin meningkat hingga mencapai pasar internasional.',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc458681b3?auto=format&fit=crop&q=80&w=600',
    url: 'https://jogja.idntimes.com/business/economy/daruwaskita/sekilo-bunga-telang-dihargai-rp500-ribu-diminati-hingga-bangladesh',
    views: '3.1k',
    date: '2 Okt 2020',
    category: 'Produk & UMKM'
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'b1',
    title: 'Kesehatan Otak',
    description: 'Mengandung antioksidan flavonoid yang memperbaiki sel saraf dan meningkatkan daya ingat.',
    icon: 'fa-brain',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: 'b2',
    title: 'Memperbaiki Mood',
    description: 'Efek penghilang stres yang membantu mengurangi gejala kecemasan dan depresi ringan.',
    icon: 'fa-smile',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'b3',
    title: 'Anti-Inflamasi',
    description: 'Mengandung asam oleat tinggi untuk mengurangi peradangan dan infeksi pada tubuh.',
    icon: 'fa-hand-holding-medical',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'b4',
    title: 'Mencegah Rambut Rontok',
    description: 'Bioflavonoid meningkatkan sirkulasi darah di kulit kepala untuk menyehatkan folikel rambut.',
    icon: 'fa-vial',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    id: 'b5',
    title: 'Diabetes & Hipertensi',
    description: 'Membantu stimulasi pelepasan insulin dan mengurangi kekakuan arteri untuk tekanan darah.',
    icon: 'fa-heart-pulse',
    color: 'bg-red-100 text-red-600'
  }
];
