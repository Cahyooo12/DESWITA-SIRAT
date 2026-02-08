import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService } from '../services/db';
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
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;

    articles: Article[];
    addArticle: (article: Article) => Promise<void>;
    updateArticle: (article: Article) => Promise<void>;
    deleteArticle: (id: string) => Promise<void>;

    events: Event[];
    addEvent: (event: Event) => Promise<void>;
    updateEvent: (event: Event) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Products
                let dbProducts = await dbService.getAllProducts();
                if (dbProducts.length === 0) {
                    const storedProducts = localStorage.getItem('deswita_products');
                    if (storedProducts) {
                        const parsedProducts: Product[] = JSON.parse(storedProducts);
                        // Migration logic
                        const migratedProducts = parsedProducts.map(p => ({
                            ...p,
                            images: p.images || (p.image ? [p.image] : []),
                            sizes: p.sizes || (p.size ? [p.size] : [])
                        }));
                        for (const p of migratedProducts) await dbService.addProduct(p);
                        dbProducts = migratedProducts;
                    } else {
                        const initialProducts = PRODUCTS.map(p => ({
                            ...p,
                            images: p.images || [p.image],
                            sizes: p.sizes || (p.size ? [p.size] : [])
                        }));
                        for (const p of initialProducts) await dbService.addProduct(p);
                        dbProducts = initialProducts;
                    }
                }
                setProducts(dbProducts);

                // Articles
                let dbArticles = await dbService.getAllArticles();
                if (dbArticles.length === 0) {
                    const storedArticles = localStorage.getItem('deswita_articles');
                    if (storedArticles) {
                        const parsedArticles = JSON.parse(storedArticles);
                        for (const a of parsedArticles) await dbService.addArticle(a);
                        dbArticles = parsedArticles;
                    } else {
                        for (const a of ARTICLES) await dbService.addArticle(a);
                        dbArticles = ARTICLES;
                    }
                }
                setArticles(dbArticles);

                // Events
                let dbEvents = await dbService.getAllEvents();
                if (dbEvents.length === 0) {
                    const storedEvents = localStorage.getItem('deswita_events');
                    if (storedEvents) {
                        const parsedEvents = JSON.parse(storedEvents);
                        for (const e of parsedEvents) await dbService.addEvent(e);
                        dbEvents = parsedEvents;
                    } else {
                        for (const e of INITIAL_EVENTS) await dbService.addEvent(e);
                        dbEvents = INITIAL_EVENTS;
                    }
                }
                setEvents(dbEvents);

                setIsLoaded(true);
            } catch (error) {
                console.error("Failed to load data from DB:", error);
            }
        };

        loadData();
    }, []);

    const addProduct = async (product: Product) => {
        await dbService.addProduct(product);
        setProducts(prev => [...prev, product]);
    };

    const updateProduct = async (updated: Product) => {
        await dbService.updateProduct(updated);
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    };

    const deleteProduct = async (id: string) => {
        await dbService.deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const addArticle = async (article: Article) => {
        await dbService.addArticle(article);
        setArticles(prev => [...prev, article]);
    };

    const updateArticle = async (updated: Article) => {
        await dbService.updateArticle(updated);
        setArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
    };

    const deleteArticle = async (id: string) => {
        await dbService.deleteArticle(id);
        setArticles(prev => prev.filter(a => a.id !== id));
    };

    const addEvent = async (event: Event) => {
        await dbService.addEvent(event);
        setEvents(prev => [...prev, event]);
    };

    const updateEvent = async (updated: Event) => {
        await dbService.updateEvent(updated);
        setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
    };

    const deleteEvent = async (id: string) => {
        await dbService.deleteEvent(id);
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    if (!isLoaded) return null;

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
