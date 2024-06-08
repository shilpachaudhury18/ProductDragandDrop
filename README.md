Product Table App

This is a Next.js project that displays a table of products fetched from the Fake Store API. Each cell in the table represents a product, and users can interact with the cells to view product details, navigate using keyboard keys, and rearrange products using drag-and-drop functionality.

Setup
To run this project locally or deploy it to a hosting platform, follow these steps:

Prerequisites
Node.js and npm installed on your machine.
Installation
Clone the repository to your local machine using the following command:

bash

git clone <repository-url>
Navigate to the project directory:

bash

cd product-table-app
Install project dependencies:

bash

npm install
Running the Application
To start the development server and view the app in your browser, use the following command:

bash

npm run dev

The application will be accessible at http://localhost:3000.

Deployment
To deploy the application to a hosting platform like Vercel or Heroku, follow these general steps:

Sign up or log in to your preferred hosting platform.
Create a new project or app.
Connect your Git repository to the hosting platform.
Configure the deployment settings (e.g., environment variables, build commands).
Trigger the deployment process.

Configuration
If you need to make any configuration changes, you can do so by modifying the appropriate files:

components/ProductTable.tsx: Adjust the number of rows and columns.

components/ProductCell.tsx: Customize the appearance of individual product cells.
Usage

Click on a cell in the table to view the details of the corresponding product.
Use the arrow keys on your keyboard to navigate between cells.
Drag and drop cells to rearrange the products.
