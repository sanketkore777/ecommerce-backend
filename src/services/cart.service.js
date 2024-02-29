const Cart = require('../Models/cart.model')
const CartItem = require('../Models/cartItem.model')
const Product = require('../Models/product.model')

const createCart = async (userId) => {
    try {
        console.log(userId)
        let cart = await new Cart({ user: userId })
        const createdCart = await cart.save()
        return createdCart;
    } catch (error) {
        throw new Error(error.message)

    }
}

const getUserCart = async (userId) => {
    try {
        let cart = await Cart.findOne({ user: userId })
        console.log(cart)
        let cartItems = await CartItem.find({ cart: cart._id }).populate("product")
        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (let item of cart.cartItems) {
            totalPrice += item.price * item.quantity
            totalDiscountedPrice += item.discountedPrice;
            totalItem = item.quantity
        }

        cart.totalPrice = totalPrice
        cart.totalItem = totalItem
        cart.discount = totalPrice - totalDiscountedPrice;

        return cart;
    } catch (error) {
        throw new Error(error.message)
    }
}

const addCartItem = async (userId, req) => {
    try {
        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            console.log(userId + 'alsdfjaldjfla')
            cart = await createCart(userId)
        }
        console.log(req.productId, 'opopopopop')
        const product = await Product.findById(req.productId)

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId: userId })

        if (!isPresent) {
            const cartItem = new CartItem(({
                product: product._id,
                cart: cart._id,
                quantity: req.quantity,
                userId,
                price: product.price,
                discountedPrice: product.discountedPrice,

            }))

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "item added to cart :/"
        }
    } catch (error) {
        console.log(error, 'lklklklk')
        throw new Error(error.message)
    }
}

const removeCartItem = async (userId, req) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        x
        // If the cart doesn't exist, you might want to handle this case according to your requirements
        if (!cart) {
            return "Cart not found";
        }

        const product = await Product.findById(req.productId);

        // Find the cart item in the database
        const cartItem = await CartItem.findOne({ cart: cart._id, product: product._id, userId: userId });

        // If the cart item doesn't exist, you might want to handle this case according to your requirements
        if (!cartItem) {
            return "Cart item not found";
        }

        // Remove the cart item from the cart's cartItems array
        cart.cartItems = cart.cartItems.filter(item => item._id.toString() !== cartItem._id.toString());

        // Save the updated cart
        await cart.save();

        // Remove the cart item from the database
        await CartItem.deleteOne({ _id: cartItem._id });

        return "Item removed from cart :)";
    } catch (error) {
        console.log(error, 'Error removing cart item');
        throw new Error(error.message);
    }
};


module.exports = { createCart, getUserCart, addCartItem, removeCartItem }