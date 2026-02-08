import { Product, Article, Event } from '../types';


// DB_NAME and DB_VERSION are no longer needed as we are not using IndexedDB directly.
// const DB_NAME = 'deswita-db';
// const DB_VERSION = 1;

// dbPromise and getDB are no longer needed as we are not using IndexedDB directly.
// let dbPromise: Promise<IDBPDatabase<DeswitaDB>> | null = null;
// const getDB = () => {
//     if (!dbPromise) {
//         dbPromise = openDB<DeswitaDB>(DB_NAME, DB_VERSION, {
//             upgrade(db) {
//                 if (!db.objectStoreNames.contains('products')) {
//                     db.createObjectStore('products', { keyPath: 'id' });
//                 }
//                 if (!db.objectStoreNames.contains('articles')) {
//                     db.createObjectStore('articles', { keyPath: 'id' });
//                 }
//                 if (!db.objectStoreNames.contains('events')) {
//                     db.createObjectStore('events', { keyPath: 'id' });
//                 }
//             },
//         });
//     }
//     return dbPromise;
// };

export const dbService = {
    // Helper for requests
    async request<T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(`/api/${endpoint}`, options);
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    // Products
    async getAllProducts(): Promise<Product[]> {
        return this.request('products');
    },
    async addProduct(product: Product): Promise<void> {
        await this.request('products', 'POST', product);
    },
    async updateProduct(product: Product): Promise<void> {
        await this.request('products', 'PUT', product);
    },
    async deleteProduct(id: string): Promise<void> {
        await this.request(`products/${id}`, 'DELETE');
    },
    // clearProducts is not directly mapped to an API endpoint in the new structure,
    // so it's removed or would need a specific API endpoint.
    // async clearProducts(): Promise<void> {
    //     // This would require a specific API endpoint for clearing all products
    //     // await this.request('products/clear', 'DELETE');
    // },

    // Articles
    async getAllArticles(): Promise<Article[]> {
        return this.request('articles');
    },
    async addArticle(article: Article): Promise<void> {
        await this.request('articles', 'POST', article);
    },
    async updateArticle(article: Article): Promise<void> {
        await this.request('articles', 'PUT', article);
    },
    async deleteArticle(id: string): Promise<void> {
        await this.request(`articles/${id}`, 'DELETE');
    },
    // async clearArticles(): Promise<void> {
    //     // This would require a specific API endpoint for clearing all articles
    //     // await this.request('articles/clear', 'DELETE');
    // },

    // Events
    async getAllEvents(): Promise<Event[]> {
        return this.request('events');
    },
    async addEvent(event: Event): Promise<void> {
        await this.request('events', 'POST', event);
    },
    async updateEvent(event: Event): Promise<void> {
        await this.request('events', 'PUT', event);
    },
    async deleteEvent(id: string): Promise<void> {
        await this.request(`events/${id}`, 'DELETE');
    },
    // async clearEvents(): Promise<void> {
    //     // This would require a specific API endpoint for clearing all events
    //     // await this.request('events/clear', 'DELETE');
    // },
};
