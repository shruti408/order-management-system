const { databases, storage, messaging, Query, InputFile } = require('../config/appwrite');
const { v4: uuidv4 } = require('uuid');

// Appwrite collection and bucket IDs
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
const TARGET_ID = process.env.APPWRITE_TARGET_ID;

const createOrder = async (customerName, orderAmount, invoiceFile) => {
    // Generate a unique ID for the new order
    const orderId = uuidv4();
    const orderDate = new Date().toISOString();

    const inputFile = InputFile.fromBuffer(
        invoiceFile.buffer,
        invoiceFile.originalname,
        invoiceFile.mimetype
    );

    if(!inputFile){
        console.error('Invalid file');
        throw new Error('Invalid file input');
    }

    //  Upload invoice to Appwrite Storage
    const storageFile = await storage.createFile(
        BUCKET_ID,
        orderId,
        inputFile
    );
    console.log(storageFile, 'invoice file uploaded');

    // Construct the URL to the uploaded file
    const invoiceFileUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${storageFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    // 2. Save order details to Appwrite Database
    const orderDocument = {
        customerName,
        orderAmount,
        orderDate,
        invoiceFileUrl
    };

    const createdDocument = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        orderId,
        orderDocument
    );

    console.log(createdDocument, 'order created successfully');
 
    if (createdDocument) {
        try {
            const message = await messaging.createEmail(
                uuidv4(),                         // messageId
                'new order',                     // subject
                'order created successfully',   // content
                [],                             // topics (optional)
                [],                             // users (optional)
                [TARGET_ID],       // target
            );
            console.log(message, 'Notifications sent.');

        } catch (error) {
            console.error('Failed to send notifications:', error);
        }
        return createdDocument;
    }
    return null;
};

const getOrderById = async (orderId) => {

    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('$id', orderId)]
        );
        const response = result.documents.length > 0 ? result.documents[0] : null;
        return response;
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        return null;
    }
};

const getFileById = async (fileId) => {
    try {
        const fileData = await storage.getFileDownload(BUCKET_ID, fileId);
        return fileData;

    } catch (error) {
        console.error('Error fetching file by ID:', error);
        return null;
    }
};

const getAllOrders = async () => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        return result.documents;
    } catch (error) {
        console.error('Error fetching orders', error);
        return null;
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    getFileById
};

