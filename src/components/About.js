import './styling.css'
import { useState } from 'react';
import Accordion from './accordian';



export default function About(){

	

	const [expandedSections, setExpandedSections] = useState([false, false, false, false, false, false]);

	const toggleSection = (index) => {
	  setExpandedSections((prevSections) => {
		const newSections = [...prevSections];
		newSections[index] = !newSections[index];
		return newSections;
	  });
	};

const faqGeneral = [
  {
    title: 'What is your return policy?',
    content: 'Our return policy allows for returns within 30 days of purchase.',
  },
  {
    title: 'How do I track my order?',
    content: 'You can track your order using the tracking link provided in the confirmation email.',
  },
  {
    title: 'How long does shipping take?',
    content: 'Shipping usually takes between 5-10 business days.',
  },
  {
    title: 'Do you offer international shipping?',
    content: 'Yes, we offer international shipping to select countries.',
  },
  {
    title: 'What payment methods do you accept?',
    content: 'We accept credit cards, PayPal, and bank transfers.',
  },
  {
    title: 'Is my payment information secure?',
    content: 'Yes, we use industry-standard encryption to ensure your payment information is secure.',
  },
  {
    title: 'Can I change my order after it has been placed?',
    content: 'Yes, you can change your order within 24 hours of placing it by contacting our customer service team.',
  },
  {
    title: 'What should I do if I receive a damaged item?',
    content: 'If you receive a damaged item, please contact us immediately with photos of the damage, and we will arrange for a replacement or refund.',
  },
  {
    title: 'How do I cancel my order?',
    content: 'You can cancel your order within 24 hours of placing it by reaching out to our customer support team.',
  },
  {
    title: 'Do you offer gift wrapping?',
    content: 'Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout.',
  },
  {
    title: 'Can I use multiple discount codes on one order?',
    content: 'No, only one discount code can be applied per order.',
  },
  {
    title: 'What should I do if I forget my account password?',
    content: 'If you forget your password, you can reset it by clicking the "Forgot Password" link on the login page and following the instructions.',
  },
  {
    title: 'How can I contact customer support?',
    content: 'You can contact our customer support team via email, phone, or live chat during our business hours.',
  },
  {
    title: 'Do you offer bulk purchasing options?',
    content: 'Yes, we offer discounts for bulk purchases. Please contact our sales team for more information.',
  },
];






	return(
		<div id = 'About' >
{/* 
		<div className = 'search-container'>
			<input type = 'text' placeholder='Search key words'></input>
			<button>Search</button>
		</div> */}


			<div id = 'aboutDivs'>

				<div id = 'faq'>
					<h2>Frequently Asked Questions</h2>
					<Accordion items={faqGeneral} />

				</div>


				<div id = 'Features'>
					<h1>Features</h1>
					<p className = 'mainText'>Simple to use and intuitive; We offer many features that will help you 
						personalize your dice mosaic: 
					</p>
					<div data-aos = 'fade-right' data-aos-duration = '2000' data-aos-offset="100">
						<h3 onClick={() => toggleSection(0)} style={{ cursor: 'pointer' }}>Selecting a photo</h3>
						{expandedSections[0] && (
						<p>Select the Choose Image button to select a photo from your device. Once you have selected a photo the dice art generator will work it's magic! From here you can begin modifying your image to your personal touch!</p>
						)}
					</div>

					<div data-aos = 'fade-left' data-aos-duration = '2000' data-aos-offset="100">
						<h3 onClick={() => toggleSection(1)} style={{ cursor: 'pointer' }}>Changing shades</h3>
						{expandedSections[1] && (
						<p>We offer three different shade options for your mosaic. Black, White, and a combination of the two. To choose your mosaic's shade select one of the three dice image radio buttons.</p>
						)}
					</div>

					<div data-aos = 'fade-right' data-aos-duration = '2000' data-aos-offset="100">
						<h3 onClick={() => toggleSection(2)} style={{ cursor: 'pointer' }}>Changing size</h3>
						{expandedSections[2] && (
						<p>We offer two approaches to changing the size of your mosaic. You can select increase size, or decrease size to maintain the proportionality of your mosaic. You can also directly manipulate the width and height of the mosaic using the number input underneath those buttons.</p>
						)}
					</div>

					<div data-aos = 'fade-left' data-aos-duration = '2000' data-aos-offset="100">
						<h3 onClick={() => toggleSection(3)} style={{ cursor: 'pointer' }}>Changing brightness</h3>
						{expandedSections[3] && (
						<p>To edit the brightness of your mosaic there is a slider that can be found right above the image that has been generated. Slide it right to increase the brightness, and left to decrease the brightness.</p>
						)}
					</div>

					<div data-aos = 'fade-right' data-aos-duration = '2000' data-aos-offset="100">
						<h3 onClick={() => toggleSection(4)} style={{ cursor: 'pointer' }}> Actual size</h3>
						{expandedSections[4] && (
						<p>We've implemented a simple calculator to determine the real life size of your mosaic. Simply input the width of a die that you will be using for your mosaic and the calculated size will be shown in cm underneath.</p>
						)}
					</div>

					<div data-aos = 'fade-left' data-aos-duration = '2000' data-aos-offset="200">
						<h3 onClick={() => toggleSection(5)} style={{ cursor: 'pointer' }}>Customization</h3>
						{expandedSections[5] && (
						<p>We've implemented a feature so that you can customize each die in the mosaic. Simply click on any dice in the mosaic and it will swap to its successor. Be careful, die changes that you made are erased after re-manipulating the mosaic.</p>
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
			</div>
		</div>
	)
}