import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadDir));

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Create unique filename: timestamp-originalName
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 } // 500KB limit
});

// Helper to read/write JSON data
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if not exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ products: [], articles: [], events: [] }, null, 2));
}

const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { products: [], articles: [], events: [] };
    }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- API Endpoints ---

// Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return relative path accessible via static middleware
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// Generic generic CRUD handlers
// Helper to delete file
const deleteFile = (filePath) => {
    if (!filePath) return;
    // Extract filename from URL (e.g. /uploads/image.jpg -> image.jpg)
    const filename = path.basename(filePath);
    const fullPath = path.join(uploadDir, filename);
    if (fs.existsSync(fullPath)) {
        try {
            fs.unlinkSync(fullPath);
            console.log(`Deleted file: ${fullPath}`);
        } catch (err) {
            console.error(`Failed to delete file: ${fullPath}`, err);
        }
    }
};

// Generic generic CRUD handlers
const createHandler = (collectionName) => ({
    getAll: (req, res) => {
        const data = readData();
        res.json(data[collectionName] || []);
    },
    add: (req, res) => {
        const data = readData();
        const newItem = req.body;
        if (!data[collectionName]) data[collectionName] = [];
        data[collectionName].push(newItem);
        writeData(data);
        res.json(newItem);
    },
    update: (req, res) => {
        const data = readData();
        const updatedItem = req.body;
        if (!data[collectionName]) data[collectionName] = [];
        const index = data[collectionName].findIndex(item => item.id === updatedItem.id);

        if (index !== -1) {
            const oldItem = data[collectionName][index];

            // Cleanup old images if they are replaced or removed
            const oldImages = oldItem.images || (oldItem.image ? [oldItem.image] : []);
            const newImages = updatedItem.images || (updatedItem.image ? [updatedItem.image] : []);

            oldImages.forEach(img => {
                if (img && img.startsWith('/uploads/') && !newImages.includes(img)) {
                    deleteFile(img);
                }
            });

            data[collectionName][index] = updatedItem;
            writeData(data);
            res.json(updatedItem);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    },
    delete: (req, res) => {
        const data = readData();
        const { id } = req.params;
        if (!data[collectionName]) data[collectionName] = [];

        const itemToDelete = data[collectionName].find(item => item.id === id);
        if (itemToDelete) {
            // Delete associated images
            const images = itemToDelete.images || (itemToDelete.image ? [itemToDelete.image] : []);
            images.forEach(img => {
                if (img && img.startsWith('/uploads/')) {
                    deleteFile(img);
                }
            });

            data[collectionName] = data[collectionName].filter(item => item.id !== id);
            writeData(data);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
});

const products = createHandler('products');
const articles = createHandler('articles');
const events = createHandler('events');

// Products Routes
app.get('/api/products', products.getAll);
app.post('/api/products', products.add);
app.put('/api/products', products.update);
app.delete('/api/products/:id', products.delete);

// Articles Routes
app.get('/api/articles', articles.getAll);
app.post('/api/articles', articles.add);
app.put('/api/articles', articles.update);
app.delete('/api/articles/:id', articles.delete);

// Events Routes
app.get('/api/events', events.getAll);
app.post('/api/events', events.add);
app.put('/api/events', events.update);
app.delete('/api/events/:id', events.delete);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Uploads directory: ${uploadDir}`);
});
