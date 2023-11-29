import { Router } from 'express'
import cartManager from '../dao/mongo/CartsManager.js'

const router = Router()

router.get('/:cid', async (req, res) => {
	if(!req.params.cid) return 

	try{
		const cartId = req.params.cid

		const currentCart = await cartManager.getCartById(cartId)
		
		res.render('products/cart', { data: currentCart})
	}catch(error){
		res.render('errors/error', { error: error })
	}
})

export default router