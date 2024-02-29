const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const connection = require('./config/db')
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const productRoutes = require('./routes/product.route')
const adminRoutes = require('./routes/admin.route')
const adminProductRoutes = require('./routes/adminProduct.route')
const cartRoutes = require('./routes/cart.route')
const orderRoutes = require('./routes/order.route')
const cartItemRoutes = require('./routes/cartItem.route')
const reviewRoutes = require('./routes/review.route')
const ratingRoutes = require('./routes/rating.route')
const homeRoutes = require('./routes/home.route')

const app = express()

app.use(express.json())
app.use(cors())
connection()

app.use(body_parser.json())
app.use('/auth', authRoutes)//tested
app.use('/home', homeRoutes)
app.use('/api/user', userRoutes)//tested
app.use('/api/products', productRoutes)//tested
app.use('/api/admin/orders', adminRoutes)//tested
app.use('/api/admin/products', adminProductRoutes)//tested
app.use('/api/cart', cartRoutes)//tested
app.use('/api/order', orderRoutes)//tested
app.use('/api/cartItems', cartItemRoutes)//tested
app.use('/api/review', reviewRoutes)//tested
app.use('/api/rating', ratingRoutes)//tested


app.get('/', (req, res) => {
    return res.status(200).send({ message: "Home page route running", status: { val: connection } })
})

module.exports = app 