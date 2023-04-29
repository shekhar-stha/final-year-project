const route = require("express").Router()
const Order = require('../models/OrdersModel')
const auth = require('../middleware/auth')
const Product = require('../models/ProductModel')
const Shipping = require('../models/ShippingDetailsModel')
const ProductPayment = require("../models/ProductPaymentModel")
const sequelize = require('sequelize');
const { Op } = require('sequelize');

route.post('/createOrder', auth.verifyUser, async (req, res) => {
  console.log(req.body.payment_type)
  try {
    const data = await Order.create({ ...req.body, userId: userData.id })
    if (req.body.payment_type !== "COD") {
      const payment = await ProductPayment.create({ ...req.body, amount: data.amount, orderId: data.id })
      res.status(200).send(payment)
    } else {
      res.status(200).send(data)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

route.get("/getOrders", auth.verifyUser, async (req, res) => {
  const { id } = req.query;
  console.log("order id:", id)
  try {
    const data = await Order.findAll({
      where: id ? { id } : {},
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

route.get("/getTotalAmount", auth.verifyUser, async (req, res) => {
  try {
    const data = await Order.sum('amount', {
      where: {
        status: { [Op.ne]: 'Cancelled' }
      }
    });
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

route.post("/getOrderByDates", auth.verifyUser, async (req, res) => {
  try {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;

    const date = new Date(fromDate);

    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    }

    const newEndDate = addDays(date, 1);
    const data = await Order.findAll({
      order: [
        ["id", "DESC"],
      ],
      where: {
        ordered_date: {
          [Op.and]: {
            [Op.gte]: newEndDate,
            [Op.lte]: toDate
          }
        }
      }
    });
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})



// count total number of orders
route.get("/getOrderCount", auth.verifyUser, async (req, res) => {
  try {
    const count = await Order.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).send(error);
  }
});

route.get("/latestOrders", auth.verifyUser, async (req, res) => {
  try {
    const latestOrders = await Order.findAll({
      order: [["createdAt", "DESC"]],
      limit: 4,
    });
    res.status(200).json(latestOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


route.get("/getUserOrder", auth.verifyUser, async (req, res) => {
  try {
    const data = await Order.findAll({ where: { userId: userData.id } });
    res.status(200).json(data)
    console.log(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

route.get("/getOneOrder/:id", auth.verifyUser, async (req, res) => {
  try {
    const data = await Order.findOne({ where: { id: req.params.id } });
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

route.get("/getProductPayments", auth.verifyUser, async (req, res) => {
  try {
    const data = await ProductPayment.findAll({ include: [{ model: Order }] });
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})


route.patch("/updateOrder/:id", auth.verifyUser, async (req, res) => {
  try {
    const data = await Order.findOne({ where: { id: req.params.id } });
    if (data) {
      const updatedData = await Order.update(req.body, { where: { id: req.params.id } })
      res.status(200).json(updatedData)
    } else {
      res.status(404).json("Id didn't match")
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = route