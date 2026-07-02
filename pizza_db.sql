use pizza_db

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image VARCHAR(255),
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_category
    FOREIGN KEY(category_id)
    REFERENCES categories(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_price DECIMAL(10,2) DEFAULT 0,
    status ENUM('Pending','Diproses','Selesai')
        DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_customer
    FOREIGN KEY(customer_id)
    REFERENCES customers(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    qty INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_orderitem_order
    FOREIGN KEY(order_id)
    REFERENCES orders(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

    CONSTRAINT fk_orderitem_product
    FOREIGN KEY(product_id)
    REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);


INSERT INTO categories (name)
VALUES
('Pizza'),
('Minuman'),
('Dessert');

INSERT INTO products
(name, price, stock, image, category_id)
VALUES
('Pepperoni Pizza', 85000, 20, 'pepperoni.jpg', 1),

('Cheese Pizza', 70000, 15, 'cheese.jpg', 1),

('BBQ Chicken Pizza', 95000, 10, 'bbq.jpg', 1),

('Coca Cola', 15000, 30, 'cola.jpg', 2),

('Orange Juice', 18000, 25, 'orange.jpg', 2),

('Chocolate Ice Cream', 25000, 12, 'icecream.jpg', 3);



INSERT INTO customers
(name, phone)
VALUES
('Budi', '081234567890'),
('Siti', '081345678901'),
('Andi', '082233445566');

INSERT INTO users
(name,email,password,role)
VALUES
('Administrator',
'admin@pizza.com',
'admin123',
'admin'),

('Alfian',
'user@pizza.com',
'user123',
'user');

SELECT
products.id,
products.name,
categories.name AS category
FROM products
JOIN categories
ON products.category_id = categories.id;

SELECT * FROM users;

UPDATE users
SET role = 'admin'
WHERE email = 'admin@gmail.com';

SELECT id, name, email, role FROM users;


ALTER TABLE orders
ADD COLUMN user_id INT NULL AFTER customer_id;


ALTER TABLE orders
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE SET NULL
ON UPDATE CASCADE;

DESC orders;