# Full stack app - learning objective

### To start the app via Docker:

#### Init the db & Start Spring Backend via docker-compose
* Run 'docker-compose up' in the root directory

#### Starting the Angular app (without Docker, required Angluar CLI):
* Navigate terminal to Angular app root directory
* Run 'ng serve'

#### Check the App
* Visit 'http://localhost:4200'

Note (TODO type): Angular is not dockerized because of uploading Angular app onto nginx server inside a container has some problem with containers names resolving. For example when querying the spring backend, the DNS resolving is not done successfully.


#### To start the app (without Docker):
1. Run all 4 db scripts from db-scripts folder
2. Run ApiApplication.class // Spring Boot App
3. ng serve // Angular app


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
