import './styling.css'
import { useState } from 'react';
export default function About(){


	const [expandedSections, setExpandedSections] = useState([false, false, false, false, false, false]);

	const toggleSection = (index) => {
	  setExpandedSections((prevSections) => {
		const newSections = [...prevSections];
		newSections[index] = !newSections[index];
		return newSections;
	  });
	};



	return(
		<div id = 'About'>
			<div>
				<div id = 'Features'>
					<h1>Using our dice mosaic generator</h1>
					<p class = 'mainText'>Our dice mosaic generator is simple to use and intuitive. We offer many features that will help you 
						personalize your dice mosaic: 
					</p>
				<div>
					<h3 onClick={() => toggleSection(0)} style={{ cursor: 'pointer' }}>Selecting a photo</h3>
					{expandedSections[0] && (
					<p>Select the Choose Image button to select a photo from your device. Once you have selected a photo the dice art generator will work it's magic! From here you can begin modifying your image to your personal touch!</p>
					)}
				</div>

				<div>
					<h3 onClick={() => toggleSection(1)} style={{ cursor: 'pointer' }}>Changing the shades of your mosaic</h3>
					{expandedSections[1] && (
					<p>We offer three different shade options for your mosaic. Black, White, and a combination of the two. To choose your mosaic's shade select one of the three dice image radio buttons.</p>
					)}
				</div>

				<div>
					<h3 onClick={() => toggleSection(2)} style={{ cursor: 'pointer' }}>Changing the size of your mosaic</h3>
					{expandedSections[2] && (
					<p>We offer two approaches to changing the size of your mosaic. You can select increase size, or decrease size to maintain the proportionality of your mosaic. You can also directly manipulate the width and height of the mosaic using the number input underneath those buttons.</p>
					)}
				</div>

				<div>
					<h3 onClick={() => toggleSection(3)} style={{ cursor: 'pointer' }}>Changing the brightness</h3>
					{expandedSections[3] && (
					<p>To edit the brightness of your mosaic there is a slider that can be found right above the image that has been generated. Slide it right to increase the brightness, and left to decrease the brightness.</p>
					)}
				</div>

				<div>
					<h3 onClick={() => toggleSection(4)} style={{ cursor: 'pointer' }}>Real life mosaic size</h3>
					{expandedSections[4] && (
					<p>We've implemented a simple calculator to determine the real life size of your mosaic. Simply input the width of a die that you will be using for your mosaic and the calculated size will be shown in cm underneath.</p>
					)}
				</div>

				<div>
					<h3 onClick={() => toggleSection(5)} style={{ cursor: 'pointer' }}>Customizing my mosaic</h3>
					{expandedSections[5] && (
					<p>We've implemented a feature so that you can customize each die in the mosaic. Simply click on any dice in the mosaic and it will swap to its successor.</p>
					)}
				</div>

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
						{/* <p>
						<img alt="9.4" src="https://ae01.alicdn.com/kf/H0337c549433a46b7a2644e9ac4bc0920V.jpg" referrerpolicy="no-referrer"></img>
						<img alt="9.4.1" src="https://ae01.alicdn.com/kf/Hd6aa5483d0e945288de98b8327a68882c.jpg" referrerpolicy="no-referrer"></img>
						</p> */}
				</div>

			
			</div>
		</div>
	)
}