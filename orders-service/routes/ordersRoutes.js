const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getAllOrders, getFileById } = require('../services/ordersService');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() })

// create new order 
router.post('/', upload.single('invoiceFile'), async (req, res) => {
     const { customerName, orderAmount } = req.body;
    const invoiceFile = req.file;

    if (!customerName || !orderAmount || !invoiceFile) {
        return res.status(400).json({ error: 'Missing required fields: customerName, orderAmount, and invoice file.' });
    }

    try {
        const newOrder = await createOrder(customerName, parseFloat(orderAmount), invoiceFile);
        console.log(newOrder)
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order.' });
    }
});

// get all orders 
router.get('/', async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
});

// get order by id 
router.get('/orders/:id', async (req, res) => {
    try {
         const orderId = req.params.id;
        const order = await getOrderById(orderId);
       
        if (order) {

            res.status(200).json(order);
        } else {
            res.status(404).json({ error: 'Order not found.' });
        }
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ error: 'Failed to fetch order.' });
    }
});

// get file by id 
router.get('/orders/files/:id', async (req, res) => {
    try {
         
        const fileId = req.params.id;
        const fileData = await getFileById(fileId);
        
        // binarydata    
        const binarydata = new Uint8Array(fileData);
            
        // Set HTTP Headers
        res.setHeader('Content-Type', 'application/pdf'); // Or other appropriate MIME type
        res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
        res.setHeader('Content-Length', binarydata.length);

        // 3. Send the binary data
         res.status(200).send( binarydata );
          
    } catch (error) {
        console.error('Error fetching file by ID:', error);
        res.status(500).json({ error: 'Failed to fetch invoice file.' });
    }
});

module.exports = router;

