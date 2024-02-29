const orderService = require('../services/order.service')

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders()
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const confirmedOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.confirmedOrder(orderId)
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const shippOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.shipOrder(orderId)
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const deliverOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deliverOrders(orderId)
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const cancelledOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.cancelledOrder(orderId)
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const deleteOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deleteOrder(orderId)
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { getAllOrders, deleteOrders, cancelledOrders, shippOrders, deleteOrders, confirmedOrders, deliverOrder }
