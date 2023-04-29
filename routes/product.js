const route = require("express").Router()
const auth = require('../middleware/auth')
const Product = require('../models/ProductModel')
const upload = require('../middleware/fileUpload')
const { Op } = require('sequelize');

route.post('/addProduct', upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 }])
    , auth.verifyAdmin, async (req, res) => {
        try {
            const img1 = req.files["img1"][0].filename
            const img2 = req.files["img2"][0].filename
            const img3 = req.files["img3"][0].filename

            const data = await Product.create({ ...req.body, img1, img2, img3, price: Number(req.body.price), discount: Number(req.body.discount) });
            res.status(200).send(data.dataValues);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

route.get('/getProduct', auth.verifyUser, async (req, res) => {
    try {
        const data = await Product.findAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/getHighestPrice', auth.verifyUser, async (req, res) => {
    try {
        const products = await Product.findAll()
        let highestPrice = 0

        // Loop through all the products to find the highest price
        for (let i = 0; i < products.length; i++) {
            if (products[i].price > highestPrice) {
                highestPrice = products[i].price
            }
        }

        res.status(200).json({ highestPrice })
    } catch (error) {
        res.status(500).send(error)
    }
})



route.get('/searchProduct', auth.verifyUser, async (req, res) => {
    const { keyword, maxPrice, genres } = req.query;
    console.log(req.query)
    try {
        let whereClause = {
            [Op.or]: [
                { name: { [Op.iLike]: `%${keyword}%` } },
                { description: { [Op.iLike]: `%${keyword}%` } }
            ]
        };
        if (genres) {
            whereClause.genre = { [Op.in]: genres.split(',') };
        }
        let products = await Product.findAll({ where: whereClause });

        if (maxPrice) {
            products = products.filter((product) => (product.price - product.discount) <= maxPrice);
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

route.get('/getProductsAdmin', auth.verifyUser, async (req, res) => {
    const { keyword } = req.query;
    console.log(keyword)
    try {
        const data = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${keyword}%` } },
                ]
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});





route.get('/getProduct/:productId', auth.verifyUser, async (req, res) => {
    const data = await Product.findOne({ where: { id: req.params.productId } })
    try {
        if (data !== null) {
            res.status(200).json(data)
        } else {
            res.status(200).send("Product not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.patch('/updateProduct/:id', upload.fields([{ name: "img1", maxCount: 1 }, { name: "img2", maxCount: 1 }, { name: "img3", maxCount: 1 }]), auth.verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).send('Product not found');
        }

        let img1 = product.img1;
        let img2 = product.img2;
        let img3 = product.img3;

        if (req.files["img1"]) {
            img1 = req.files["img1"][0].filename;
        }

        if (req.files["img2"]) {
            img2 = req.files["img2"][0].filename;
        }

        if (req.files["img3"]) {
            img3 = req.files["img3"][0].filename;
        }

        const updatedProduct = await product.update({
            ...req.body,
            img1,
            img2,
            img3,
            price: Number(req.body.price),
            discount: Number(req.body.discount)
        });

        res.status(200).send(updatedProduct.dataValues);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

route.delete("/deleteProduct/:productId", auth.verifyAdmin, async (req, res) => {
    const data = await Product.findOne({ where: { id: req.params.productId } })
    try {
        if (data !== null) {
            await Product.destroy({ where: { id: req.params.productId } });
            res.status(200).json("Successfully deleted")
        } else {
            res.status(200).send("Product not found")
        }
    } catch (error) {
        res.status(500).send(error)

    }
})

module.exports = route; 