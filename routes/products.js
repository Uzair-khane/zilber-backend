const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure karein ke backend root mein 'uploads' folder bana ho
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB file size
});

// --- Controllers ---
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// --- Routes ---
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Create Product: 'image' wo field name hai jo frontend FormData mein use ho raha hai
router.post('/', auth, upload.single('image'), createProduct);

// Update Product: Ismein bhi image update ka option add kiya gaya hai
router.put('/:id', auth, upload.single('image'), updateProduct);

router.delete('/:id', auth, deleteProduct);

module.exports = router;