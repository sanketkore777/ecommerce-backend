const createService = require("../services/cart.service")
const Address = require('../Models/address.model')
const Order = require('../Models/order.model')

async function createOrder(user, shippAddress) {
    let address;
    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id)
        address = existAddress;
    } else {
        address = new Address(shippAddress)
        address.user = user
        await address.save();

        user.addresses.push(address)
        await user.save()
    }

    const cart = await createService.getUserCart(user._id)
    const orderItems = []
    for (let item of cart.cartItems) {
        const orderItem = new orderItems({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            ssize: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice
        })
        const createOrderItem = await orderItem.save();
        orderItems.push(createOrderItem)
    }
    const createdOrder = new Order({
        user, orderItems, totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discounte: cart.discount,
        totalItem: cart.totalItem,
        shippAddress: addresse,
    })

    const savedOrder = await createOrder.save()
    return savedOrder;
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "Placed";
    order.paymentDetails.status = 'Completed'

    return await order.save();
}

async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "Confirmed";

    return await order.save();
}

async function shipOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "shipped";

    return await order.save();
}

async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "Delivered";

    return await order.save();
}

async function cancelledOrder(orderId) {
    const order = await findOrderById(orderId)

    order.orderStatus = "Cancelled";

    return await order.save();
}

async function findOrderById(orderId) {
    try {
        const order = Order.findById(orderId).populate('user')
            .populate({ path: 'orderItems', populate: { path: "product" } })
            .populate('shippingAddress')
        return order
    } catch (error) {
        throw new Error(error.message)
    }
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "Placed" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()

        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()
}

async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id)
}

module.exports = { createOrder, placeOrder, confirmedOrder, shipOrder, deleteOrder, cancelledOrder, findOrderById, usersOrderHistory, getAllOrders, deleteOrder }