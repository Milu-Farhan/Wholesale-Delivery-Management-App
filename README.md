# Wholesale Delivery Management App
The Wholesale Delivery Management App is designed to facilitate the efficient distribution of goods from wholesalers to retail vendors. It enables truck drivers to manage orders and track vendor-related information. The system is accessible by Admin and Truck Drivers (TD)

### Authentication
Using authentication APIs, administrators can register new accounts, and both admins and truck drivers can log in to their accounts to obtain access tokens.

&nbsp;

```POST``` **Admin Signup** `{{base_url}}/api/v1/user/signup`

###### Request Body
**name** : String `required` </br>
**phoneNumber** : Number `required` </br>
**email** : String `required` </br>
**password** : String `required` </br>
**confirmPassword** : String `required` </br>

&nbsp;

```POST``` **Admin Login** `{{base_url}}/api/v1/user/login`

###### Request Body
**phoneNumber** : Number `required` </br>
**password** : String `required` </br>
 
&nbsp;

### Truck Drivers Management
Using truck driver management APIs, administrators can access, create, update, or delete truck drivers.

**Authorization** : `Required` </br>
**Permission** : `Admins` </br>

&nbsp;

```GET``` **Get All Truck Drivers** `{{base_url}}/api/v1/admin/users`

###### Request Headers
**Authorization** : Bearer {{access_token}}

&nbsp;

```GET``` **Get Single Truck Driver** `{{base_url}}/api/v1/admin/users/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

&nbsp;

```POST``` **Create New Truck Driver** `{{base_url}}/api/v1/admin/users`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Request Body
**name** : String `required` </br>
**phoneNumber** : Number `required` </br>
**address** : String `required` </br>
**password** : String `required` </br>
**confirmPassword** : String `required` </br>
**role** : String `required` </br>
**licenseNumber** : String `required` </br>

&nbsp;

```PATCH``` **Update Truck Driver** `{{base_url}}/api/v1/admin/users/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

###### Request Body
**name** : String `optional` </br>
**phoneNumber** : Number `optional` </br>
**address** : String `optional` </br>
**password** : String `optional` </br>
**confirmPassword** : String `optional` </br>
**role** : String `optional` </br>
**licenseNumber** : String `optional` </br>

&nbsp;

```DELETE``` **Delete Truck Driver** `{{base_url}}/api/v1/admin/users/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

&nbsp;

### Product Management
Using product management APIs, administrators can access, create, update, or delete products and upload product images.

**Authorization** : `Required` </br>
**Permission** : `Admins` </br>

>**Important to note:**
Product creation is handled using two APIs for efficiency. The product image upload API should be called first in order to obtain the uploaded image file, and only then can we proceed to call the product creation API.

&nbsp;

```GET``` **Get All Products** `{{base_url}}/api/v1/admin/products`

###### Request Headers
**Authorization** : Bearer {{access_token}}

&nbsp;

```GET``` **Get Single Product** `{{base_url}}/api/v1/admin/products/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

&nbsp;

```POST``` **Product Image Upload** `{{base_url}}/api/v1/admin/products/image-upload`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Request Body
**image** : File `required`

&nbsp;

```POST``` **Create New Product** `{{base_url}}/api/v1/admin/products/`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Request Body
**name** : String `required` </br>
**description** : String `required` </br>
**brand** : String `required` </br>
**price** : Number `required` </br>
**stock** : Number `required` </br>
**catogory** : String `required` </br>
**subCatogory** : String `required` </br>
**image** : String `required`  -- *filename getting from image upload API*

>**Note:**
In order to create the product, upload the product image first using the image upload API.

&nbsp;

```PATCH``` **Update Product** `{{base_url}}/api/v1/admin/products/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

###### Request Body
**name** : String `optional` </br>
**description** : String `optional` </br>
**brand** : String `optional` </br>
**price** : Number `optional` </br>
**stock** : Number `optional` </br>
**catogory** : String `optional` </br>
**subCatogory** : String `optional` </br>
**image** : String `optional`  -- *filename getting from image upload API*

>**Note:**
In order to create the product, upload the product image first using the image upload API.

&nbsp;

```DELETE``` **Delete Product** `{{base_url}}/api/v1/admin/products/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

&nbsp;

### Vendor Management
Using vendor management APIs, administrators can access, create, update, or delete vendors.

**Authorization** : `Required` </br>
**Permission** : `Admins` </br>

&nbsp;

```GET``` **Get All Vendors** `{{base_url}}/api/v1/admin/vendors`

###### Request Headers
**Authorization** : Bearer {{access_token}}

&nbsp;

```GET``` **Get Single Vendor** `{{base_url}}/api/v1/admin/vendors/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

&nbsp;

```POST``` **Create New Vendor** `{{base_url}}/api/v1/admin/vendors/`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Request Body
**name** : String `required` </br>
**location** : String `required` </br>
**email** : String `required` </br>
**phoneNumber** : Number `required` </br>

&nbsp;

```PATCH``` **Update Vendor** `{{base_url}}/api/v1/admin/vendors/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

###### Request Body
**name** : String `optional` </br>
**location** : String `optional` </br>
**email** : String `optional` </br>
**phoneNumber** : Number `optional` </br>

&nbsp;

```DELETE``` **Delete Product** `{{base_url}}/api/v1/admin/vendors/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

&nbsp;

### Order Management
Using order management APIs, administrators and truck drivers can create new orders and access previous orders.

**Authorization** : `Required` </br>
**Permission** : `Admins, Truck drivers` </br>

&nbsp;

```GET``` **Get All Orders** `{{base_url}}/api/v1/orders/`

###### Request Headers
**Authorization** : Bearer {{access_token}}

&nbsp;

```GET``` **Get Single Orders** `{{base_url}}/api/v1/admin/orders/:id`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Path Variables
**id**

&nbsp;

```POST``` **Create New Order** `{{base_url}}/api/v1/admin/orders/`

###### Request Headers
**Authorization** : Bearer {{access_token}}

###### Request Body
**products** : Array of object [{id , quantity}] `required` </br>
**vendor** : String (id) `required` </br>
**truckDriver** : String (id) `required` </br>
**collectedAmount** : Number `required` </br>
**createdBy** : String (id) `required` </br>

&nbsp;
------------

Demo : [click here](https://wholesale-delivery-management-app.onrender.com/api/v1/user/login "click here")
