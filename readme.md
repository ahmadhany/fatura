Prerequisites (must be installed):
- Postgresql
- Nodejs + npm

How to run?  
1 - check app/config/db.config to add your local postgres server credentials.  
2 - create a local database and call it 'faturadb'  
3 - install the dependencies by running `npm install`  
3 - start the application by running `npm start`  

note: after starting the application, some dummy data will be loaded to the database in order to use the below APIs.  


**you can find the database schema in folder db  

APIs:
=====
GET: localhost:3000/api/categories/1/products => getting list of products of a given category (supports pagination)  
GET: localhost:3000/api/products              => getting all of products (an example for applying the pagination middleware)  
PUT: localhost:3000/api/products/1            => updates a product based on a given id (an example for set/unset 'featured' attribute)  


