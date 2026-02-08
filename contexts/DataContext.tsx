import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Article, Event } from '../types';
import { PRODUCTS, ARTICLES } from '../constants';

// Initial Events Data (moved from EventScheduleModal.tsx)
const INITIAL_EVENTS: Event[] = [
    {
        id: 'e1',
        date: "1 Okt",
        title: "Opening Ceremony Festival",
        time: "08:00 - 12:00 WIB",
        location: "Alun-Alun Desa",
        description: "Pembukaan festival dengan arak-arakan budaya dan tarian tradisional penyambutan panen."
    },
    {
        id: 'e2',
        date: "5 Okt",
        title: "Workshop Olahan Bunga Telang",
        time: "09:00 - 14:00 WIB",
        location: "Pendopo Agrowisata",
        description: "Belajar membuat pewarna alami, teh, dan kue tradisional berbahan dasar bunga telang."
    },
    {
        id: 'e3',
        date: "12 Okt",
        title: "Bazar Rakyat & Kuliner Desa",
        time: "10:00 - 20:00 WIB",
        location: "Sepanjang Jalan Utama",
        description: "Nikmati jajanan pasar, kerajinan tangan, dan hasil bumi langsung dari petani lokal."
    },
    {
        id: 'e4',
        date: "20 Okt",
        title: "Lomba Fotografi & Konten Kreatif",
        time: "07:00 - 16:00 WIB",
        location: "Spot Wisata Bunga Telang",
        description: "Abadikan keindahan desa dan menangkan hadiah menarik. Terbuka untuk umum!"
    },
    {
        id: 'e5',
        date: "28 Okt",
        title: "Malam Puncak & Pagelaran Wayang",
        time: "19:00 - Selesai",
        location: "Alun-Alun Desa",
        description: "Penutupan festival dengan pertunjukan wayang kulit semalam suntuk dan kembang api."
    }
];

interface DataContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;

    articles: Article[];
    addArticle: (article: Article) => void;
    updateArticle: (article: Article) => void;
    deleteArticle: (id: string) => void;

    events: Event[];
    addEvent: (event: Event) => void;
    updateEvent: (event: Event) => void;
    deleteEvent: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadData = () => {
            const storedProducts = localStorage.getItem('deswita_products');
            const storedArticles = localStorage.getItem('deswita_articles');
            const storedEvents = localStorage.getItem('deswita_events');

            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            } else {
                setProducts(PRODUCTS);
                localStorage.setItem('deswita_products', JSON.stringify(PRODUCTS));
            }

            if (storedArticles) {
                setArticles(JSON.parse(storedArticles));
            } else {
                setArticles(ARTICLES);
                localStorage.setItem('deswita_articles', JSON.stringify(ARTICLES));
            }

            if (storedEvents) {
                setEvents(JSON.parse(storedEvents));
            } else {
                setEvents(INITIAL_EVENTS);
                localStorage.setItem('deswita_events', JSON.stringify(INITIAL_EVENTS));
            }
            setIsLoaded(true);
        };

        loadData();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('deswita_products', JSON.stringify(products));
        }
    }, [products, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('deswita_articles', JSON.stringify(articles));
        }
    }, [articles, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('deswita_events', JSON.stringify(events));
        }
    }, [events, isLoaded]);

    const addProduct = (product: Product) => setProducts([...products, product]);
    const updateProduct = (updated: Product) => setProducts(products.map(p => p.id === updated.id ? updated : p));
    const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));

    const addArticle = (article: Article) => setArticles([...articles, article]);
    const updateArticle = (updated: Article) => setArticles(articles.map(a => a.id === updated.id ? updated : a));
    const deleteArticle = (id: string) => setArticles(articles.filter(a => a.id !== id));

    const addEvent = (event: Event) => setEvents([...events, event]);
    const updateEvent = (updated: Event) => setEvents(events.map(e => e.id === updated.id ? updated : e));
    const deleteEvent = (id: string) => setEvents(events.filter(e => e.id !== id));

    if (!isLoaded) return null; // Or a loading spinner

    return (
        <DataContext.Provider value={{
            products, addProduct, updateProduct, deleteProduct,
            articles, addArticle, updateArticle, deleteArticle,
            events, addEvent, updateEvent, deleteEvent
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
