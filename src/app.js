// Dependencies
import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'

// Config/Utils
import { uri } from '../env.js'

// Routes
import productsRouter from './routes/products.routes.js'
import viewsProductsRouter from './routes/views.products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import viewsCartRouter from './routes/views.cart.routes.js'
import chatRouter from './routes/chat.routes.js'

// Express config
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))

// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

const run = async () => {
	try{
		// DB Connection
		await mongoose.connect(uri)

		// HTTP Server Up
		const httpServer = app.listen(8080, () => console.log('Server up'))
		// Websocket Server Up
		const io = new Server(httpServer)

		// Routes
		app.use('/api/products', productsRouter)
		app.use('/api/carts', cartsRouter)
		app.use('/chat', chatRouter(io))
		app.use('/', viewsProductsRouter(io))
		app.use('/cart', viewsCartRouter)
	} catch (error) {
		console.error(error)
	}
}

run()