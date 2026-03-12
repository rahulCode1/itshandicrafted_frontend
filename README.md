# Ecommerce Web app

A full-stack e-commerce project where you can browse, search, add & view details of products.

Built with React frontend, Express/Node backend, Mongodb database.

---

## Demo Link

[Live Demo](https://major-project-frontend-kappa.vercel.app/)

---

## Quick Start

```
git clone https://github.com/rahulCode1/MajorProject-frontend.git
cd my-app
npm install
npm run dev
```

---

## Technologies

- React JS
- React Router
- Node JS
- Express
- Mongodb

## Demo Video

Watch a walkthrough (6 minutes) of all the major features of this app:
[Google drive link](https://drive.google.com/file/d/1sRnu-lii1OZmBhoFYYujOxuP8v8na-eQ/view?usp=sharing)

---

## Features

**Home**

- Display different products category.
- Search products by title, tags.

**Products List**

- View all products.
- Apply different filters, Sort products via price.
- Add, Remove products to Cart & Wishlist.

**Product Details**

- View Product information.
- View similar products.
- Add or Remove to Cart & Wishlist.

**Cart Page**

- Increase or Decrease product quantity.
- Remove from Cart.
- Move to Wishlist.

**Wishlist Page**

- All Products that added to Wishlist.
- Move product to Cart.

**Checkout Page**

- View order summary (Product that added to cart).
- Add, Select address.

**User Profile**
-- Show all User information.
-- Add, Update & delete address.
-- View & Cancel user orders.

---

## API Reference

### **GET /api/products**<br>

List all products<br>
Sample Response:<br>

```
[{_id, name,  description, price, ... }, ...]

```

## **GET /api/products/id**<br>

Product details<br>
Sample Response:<br>

```
{id, name, description, ...}

```

## **POST /api/product/add**<br>

Add Product<br>
Sample Response<br>

```
{name, description, price, ...}
```

## **DELETE /api/product/id**<br>

Delete Product<br>
Sample Response<br>

## **POST /api/cart/id**<br>

Add Product to Cart<br>
Sample Response<br>

```
[{name, description, price, ...}, ...]
```

## **GET /api/cart/id**<br>

GET ProductF from Cart<br>
Sample Response<br>

```
[{name, description, price, ...}, ...]
```

## **PATCH /api/cart/id**<br>

Increase product quantity<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **PATCH /api/cart/decrease/id**<br>

Decrease product quantity<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **PATCH /api/cart/remove/id**<br>

Remove product from Cart<br>
Sample Response<br>

## **PATCH /api/cart/moveto_wishlist/id**<br>

Move Product to Wishlist<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **POST /api/cart/wishlist/id**<br>

Add or Remove Product to Wishlist<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **PATCH /api/cart/wishlist/id**<br>

Move Product to Cart.<br>
Sample Response<br>

```
[{name, description, price, quantity, ...}, ...]
```

## **POST /api/address/new**<br>

Add new Address<br>
Sample Response<br>

```
[{name, phoneNumber, zipCode,  ...}, ...]
```

## **GET /api/address/id**<br>

Get user addresses<br>
Sample Response<br>

```
[{name, phoneNumber, zipCode,  ...}, ...]
```

## **GET /api/address/address_info/id**<br>

Get user addresses information<br>
Sample Response<br>

```
{name, phoneNumber, zipCode,  ...}
```

## **PATCH /api/address/update/:id/default**<br>

Update default address.<br>
Sample Response<br>

```
{name, phoneNumber, isDefault,  ...}
```

## **PATCH /api/address/update/:id**<br>

Update address.<br>
Sample Response<br>

```
{name, phoneNumber, isDefault,  ...}
```

## **DELETE /api/address/id**<br>

Delete user addresses<br>

## **POST /api/order/:id**<br>

Place Order.<br>
Sample Response<br>

```
[{products: [], orderSummary: {}, address, ...}]
```

## **GET /api/order/:id**<br>

Get User Order.<br>
Sample Response<br>

```
[{products: [], orderSummary: {}, address, ...}]
```

## **POST /api/user**<br>

Add new User<br>
Sample Response<br>

```
{name, email}


```

## **GET /api/user**<br>

Get User<br>
Sample Response<br>

```
{name, email}
```

## Contact

For bugs or feature request, please reach out to rahulkumawat50555@gmail.com