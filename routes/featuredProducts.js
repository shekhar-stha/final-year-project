const Product = require('../models/ProductModel')
const FeatureProducts = require("../models/FeaturedProducts")
const route = require("express").Router()

route.post('/postFeature', auth.verifyAdmin, async (req, res) => {
    try {
        const data = await FeatureProducts.create(req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }

})

module.exports = route;

