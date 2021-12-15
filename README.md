# Full stack app - learning objective

#### To start the app:
1. Run all 4 db scripts from db-scripts folder
2. Run ApiApplication.class // Spring Boot App
3. ng serve // Angular app

#### To start the app via Docker:

##### Init the db via docker
1.1 Navigate terminal to folder 'db'
1.2 Run 'docker build -t mysql-db-img .'
1.3 Run 'docker run --name mysql-db --rm -d -p 3306:3306 mysql-db-img'

##### Starting the Spring backend app
2.1 Navigate terminal to folder '02-backend/rest'
2.2 Run 'docker build -t e-app-img .'
2.3 Run 'docker run --name e-app -p 8080:8080 --rm e-app-img'

##### Starting the Angular app via Docker:
TODO
3. ng serve (for now without a Docker, before running navigate to Angular app root directory)

### Description:
## Spring Boot Rest App + Angular Front End App

#### Features:
* Reviewing all available products in db
* Reviewing products by selected category
* Search by name (if product name contains inputed string then it is displayed)
* Viewing product detail
* Adding product to Shopping Cart
* Editing Shopping Cart content (removing product & increasing/decreasing product amount)
* Checkout Form (Reactive approach + Some Validation) handled by Spring Boot App adding the order in the DB

#### TODO Features:
* Login / Logout (Okta or other)
* User Registration (Okta or other)
* User Order History
* Payment with Credit Card (Stripe API, Paypal API or other)
