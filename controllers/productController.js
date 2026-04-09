const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product nahi mila' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    
    // CHANGE: req.body ki jagah req.file.path use karein
    // Multer folder ka naam bhi sath deta hai: e.g. "uploads/12345.jpg"
    const imagePath = req.file ? req.file.path : null;

    const [result] = await db.query(
      'INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)',
      [name, price, imagePath, description]
    );
    res.status(201).json({ message: 'Product add ho gaya!', id: result.insertId, image: imagePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    
    // Pehle purana data lein taake agar image update na ho rahi ho toh purani rahe
    const [oldProduct] = await db.query('SELECT image FROM products WHERE id = ?', [req.params.id]);
    
    // CHANGE: Agar nayi file upload hui hai toh naya path, warna purana path
    const imagePath = req.file ? req.file.path : (req.body.image || oldProduct[0].image);

    await db.query(
      'UPDATE products SET name=?, price=?, image=?, description=? WHERE id=?',
      [name, price, imagePath, description, req.params.id]
    );
    res.json({ message: 'Product update ho gaya!', image: imagePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product delete ho gaya!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};