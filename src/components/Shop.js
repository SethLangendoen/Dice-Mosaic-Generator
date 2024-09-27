import BryBellyDice from '../Assets/100Dice.jpg'
import FepitoDice from '../Assets/Fepito100Dice.jpg'
import BlackDice8mm from '../Assets/50BlackDice8mm.jpg'
import './styling.css'; 


export default function Shop(){

	return(

		<div id = 'shop' data-aos='flip-right' data-aos-duration="1500">
			<h1 id = 'shopTitle'>Shop Dice Products: </h1>


			
			<div id = 'brybellyDiceLink'>
				<img src={BryBellyDice} alt='dice'></img>
				<div>
					<p><a href='https://amzn.to/4cPelIJ'  target='blank'>BryBelly 100 Dice, 16mm</a></p>
					<p>$22.99</p>

					<p>Traditional 6 sided D6 dice in 16mm  </p>					
				</div>
			</div>



			<div id = 'FEPITODiceLink'>
				<img src={FepitoDice} alt='dice'></img>
				<div>
					<p><a href='https://amzn.to/3Sh94le'  target='blank'>FEPITO 100 Pieces Dice Set 16mm</a></p>
					<p>$17.99</p>

					<p>6 Sided Acrylic Dice 16mm 2 Colors Spot Dice </p>					
				</div>
			</div>

			

			<div id = '8mmDiceBlackProduct'>
				<img src={BlackDice8mm} alt='dice'></img>
				<div>
					<p><a href='https://amzn.to/3WhEMzN'  target='blank'>Dice Set of 100 Pcs Diameter 8mm</a></p>
					<p>$5.32</p>

					<p>Dice Plastic Casino Dice Diameter 8mm Comfortable and Environmentally Useful and practical</p>					
				</div>
			</div>


		</div>
	)
}