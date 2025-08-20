# Appwrite setup instructions
1. Create a Project
 Go to Appwrite Console -> Create Project -> "Order Management System"

2. Create a Database
 Database: ordersDB
 Collection: orders
 Attributes:
  customerName (string)
  orderAmount (integer)
  orderDate (datetime)
  invoiceFileUrl (Url)
  and appwrite gives a DOCUMENT_ID for every new entry, we will use it as orderId.

3. Create a Storage Bucket for invoice-files 
 Bucket name: invoices
 
 
4. Setup Messaging
 Appwrite Messaging lets you send notifications (email, SMS, push).
 Go to Messaging in Appwrite console.
 Add a Provider (example: SMTP for email).
  Name: email-provider
  Type: SMTP
  Host: "smtp.ethereal.email"
  Port: 587
  Username: "brent35@ethereal.email"
  Password: "ADbZyXTkcDwkB6rD5U"
 
 Add a Topic → order-updates.
*Ethereal is a fake SMTP service where you get an email and  apssword to send email just as you would with any other SMTP provider and finally preview the sent message and no emails are actually delivered. 
 
5.Get Project Credentials
 In Appwrite console → Settings → API Keys
  Copy these into your .env: 
   PROJECT_ID, API_ENDPOINT, API_KEY. 

6. Integrate the Appwrite SDK:
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
Clone the repository: git clone "https://github.com/shruti408/order-management-system.git" 
 
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

 
