# Appwrite setup instructions
1. Create a Project
 Go to Appwrite Console -> Create Project -> "Order Management System"

2. Enable Authentication
 Add Email/Password auth in Auth settings

3. Create a Database
 Database: ordersDB
 Collection: orders
 Attributes:
  customerName (string)
  orderAmount (integer)
  orderDate (datetime)
  invoiceFileUrl (Url)
  and appwrite gives a DOCUMENT_ID for every new entry, we will use it as orderId.

4. Create a Storage Bucket for invoice-files 
 Bucket name: invoices
 
 
5. Setup Messaging
 Appwrite Messaging lets you send notifications (email, SMS, push).
 Go to Messaging in Appwrite console.
 Add a Provider (example: SMTP for email).
  Name: email-provider
  Type: SMTP
  Host: smtp.yourprovider.com
  Port: 587
  Username: your@email.com
  Password: your-smtp-password
 
 Add a Topic → order-updates.
 
5.Get Project Credentials
 In Appwrite console → Settings → API Keys
  Copy these into your .env: 
   PROJECT_ID, API_ENDPOINT, API_KEY. 

5. Integrate the Appwrite SDK:
 -Install the Appwrite SDK: npm install node-appwrite
 -Add config folder in your application's entry point, inside it add appwrite.js file.
 -Inside it, import and initialize the SDK and use it in your application


# API references
Base Url- 'https://order-system-ri5c.onrender.com'
Method - Endpoint - Description
GET - '/' - Get all orders
GET	- '/orders/:id' - Get order by ID
GET	- '/orders/files/:id' - Get file by ID
POST - '/' - Create new order
 

# How to run the app locally 
Clone the repository: git clone "https://github.com/shruti408/order-system.git" 
 
1. Setup Backend (order-service)
To come back to order-system folder: cd ..  
Go iniside orders-ui folder: cd orders-service
Install dependencies: npm install
 Create a .env file:
 APPWRITE_ENDPOINT=http://localhost/v1
 APPWRITE_PROJECT_ID=your-project-id
 APPWRITE_API_KEY=your-api-key
 PORT=5000
Run backend: npm start
API runs on - http://localhost:5000


2. Setup Frontend (order-ui)
Go iniside orders-ui folder: cd orders-ui
Install dependencies: npm install
Create .env file: VITE_BASE_URL=http://localhost:5000
Run frontend: npm run dev
Frontend runs on → http://localhost:3000

 