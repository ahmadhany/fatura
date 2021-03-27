const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

var corsOptions = {
  origin: `http://localhost:${PORT}`
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

// for development
db.sequelize.sync({ force: true }).then(async () => {
    const mobile = await db.categories.create({
        name: 'Mobile'
    })
    const tv = await db.categories.create({
        name: 'TV'
    })

    const i2 = await db.providers.create({
        name: 'I2'
    })
    const B2 = await db.providers.create({
        name: 'B2'
    })

    const iphone6 = await db.products.create({
        name: 'Iphone 6',
        featured: false,
        categoryId: mobile.id,
    })
    const iphone6s = await db.products.create({
        name: 'Iphone 6s',
        featured: false,
        categoryId: mobile.id,
    })
    const iphone8 = await db.products.create({
        name: 'Iphone 8',
        featured: false,
        categoryId: mobile.id,
    })
    const iphone9 = await db.products.create({
        name: 'Iphone 9',
        featured: false,
        categoryId: mobile.id,
    })
    const iphone10 = await db.products.create({
        name: 'Iphone 10',
        featured: false,
        categoryId: mobile.id,
    })

    // example of different category to make sure the pagination is working fine for each category
    const monitor = await db.products.create({
        name: 'ua55ru7300',
        featured: false,
        categoryId: tv.id,
    })

    i2.addProduct(iphone6, { through: { price: 500, available: true } });
    i2.addProduct(iphone6s, { through: { price: 600, available: true } });
    i2.addProduct(iphone8, { through: { price: 1000, available: true } });
    i2.addProduct(iphone9, { through: { price: 1100, available: true } });
    i2.addProduct(iphone10, { through: { price: 1200, available: true } });

    B2.addProduct(iphone8, { through: { price: 900, available: true } });
    B2.addProduct(iphone9, { through: { price: 1000, available: true } });
    B2.addProduct(iphone10, { through: { price: 1000, available: true } });
    i2.addProduct(monitor, { through: { price: 5000, available: true } })
    
    // null provider example
    db.providerProducts.create({
        productId: iphone6.id,
        price: 100,
        available: true
    })

});


app.get("/", (req, res) => {
  res.json({ message: "Hello Fatura" });
});

require("./app/routes/products.routes")(app);
require("./app/routes/categories.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
