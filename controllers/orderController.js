const db = require('../config/db');

// Order save karo
exports.createOrder = async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ error: 'Customer details incomplete' });
    }

    const [result] = await db.query(
      'INSERT INTO orders (customer_name, customer_phone, customer_city, customer_address, items, total_price) VALUES (?, ?, ?, ?, ?, ?)',
      [
        customer.name,
        customer.phone,
        customer.city,
        customer.address,
        JSON.stringify(items),
        total
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Order saved!',
      orderId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Sab orders lao
exports.getAllOrders = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
    // items JSON parse karo
    const orders = rows.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Order status update karo
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await db.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ success: true, message: 'Status updated!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Order delete karo
exports.deleteOrder = async (req, res) => {
  try {
    await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Order deleted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};