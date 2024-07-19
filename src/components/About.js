import './styling.css'

export default function About(){

	return(
		<div id = 'About'>
			<div>
				<div id = 'Features'>
					<h1>Using our dice mosaic generator:</h1>
					<p class = 'mainText'>Our dice mosaic generator is simple to use and intuitive. We offer many features that will help you 
						personalize your dice mosaic. 
					</p>

					<h3>Selecting a photo</h3>
					<p>Select the Choose Image button to select a photo from your device. Once you have selected a photo the dice art generator will work it's magic! From here you can begin modifying your image to your personal touch!</p>

					<h3>Changing the shades of your mosaic: </h3>
					<p>We offer three different shade options for your mosaic. Black, White, and a combination of the two. To choose your moasics shade select one of the three dice image radio buttons.</p>

					<h3>Changing the size of your mosaic: </h3>
					<p>We offer two approaches to changing the size of your mosaic. You can select increase size, or decrease size to maintain the proportionality of your mosaic. You can also directly manipulate the width and height of the mosaic using the number input underneath those buttons.</p>

					<h3>Changing the brightness: </h3>
					<p>To edit the brightness of your mosaic there is a slider that can be foud right above the image that has been generated. Slide it right to increase the brightness, and left to decrease the brightness. </p>

					<h3>How big is my Mosaic?</h3>
					<p>We've implemented a simple calculator to determine the real life size of your mosaic. Simply input the width of a die that you will be using for your mosaic and the calculated size will be shown in cm underneath.</p>
				
				</div>


				{/* <div id = 'CreatingTheArt'>
					<h1>I've generated my Mosaic, but how do I make it? </h1>
					<p class = 'mainText'>Creating Your dice mosaic does not have to be a challange! We have provided several steps below that will guide you through the step by step process of creating your art.</p>

					<p>The first step in creating your mosaic is getting the right materials. You will need lots of dice, your online generated mosaic, a wooden backframe, glue and optionally a frame for the outside of your mosaic.</p>

					<p>Here we have provided some of the best places to order your dice in bulk. To determine how many dice you need, look below your generated mosaic where it tells you the number of white and black dice needed for your mosaic.</p>


					<h3>The first step to creating your mosaic </h3>

				</div> */}

				<div id = 'shop'>
					<h1>Shop Dice Mosaic Products: </h1>

				</div>

			
			</div>
		</div>
	)
}