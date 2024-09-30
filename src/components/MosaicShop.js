
import Cart from './Cart'
import ProductList from './ProductsList'

export default function MosaicShop(){
	return(
		<div id = 'mosaicShop'>
			<ProductList /> 
			<Cart /> 	

			<div className="customer-reviews">
				<h1>Customer Reviews</h1>
				<p className="review">
					<strong>Patrice J. Meas says:</strong> Thank you for providing ths service. You made this entire process 
					really simple! I bought 4500 dice for my mosaic. I bought the black dice with square edges. The dice 
					were great quality. It took just over 10 days to arrive!
				</p>
				<p className="review">
					<strong>Alex T. says:</strong> "I recently ordered 3000 colorful dice for my mosaic project, and I couldn't be happier! The variety of colors is fantastic, and the quality is top-notch. They arrived a little later than expected, but the wait was worth it. Definitely recommend!"
				</p>
				<p className="review">
					<strong>Jenna L. says:</strong> "Great experience overall! Iordered 5000 dice in different sizes, and they arrived quickly. The only downside was a small scratch and a few paint mishaps on a few dice, which is reasonable. I'm already planning my next order!"
				</p>
				<p className="review">
					<strong>Mark R. says:</strong> "I bought 2000 white dice with rounded edges for a mosaic art piece. The quality was well, and they look great! Shipping took about a week, which was fine for me. Will be back for more!"
				</p>
			</div>



		</div>
	)
}

