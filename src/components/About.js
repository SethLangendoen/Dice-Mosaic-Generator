import './styling.css'
import Accordion from './accordian';



export default function About(){

	

	// const [expandedSections, setExpandedSections] = useState([false, false, false, false, false, false]);

	// const toggleSection = (index) => {
	//   setExpandedSections((prevSections) => {
	// 	const newSections = [...prevSections];
	// 	newSections[index] = !newSections[index];
	// 	return newSections;
	//   });
	// };

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
    content: 'Shipping usually takes between 10-25 business days.',
  },
  {
    title: 'Do you offer international shipping?',
    content: 'No, we do not offer international shipping.',
  },
  {
    title: 'What payment methods do you accept?',
    content: 'We accept credit and debit cards, PayPal and Google pay',
  },
  {
    title: 'Is my payment information secure?',
    content: 'Yes, we use industry-standard encryption to ensure your payment information is secure.',
  },
  {
    title: 'What should I do if I receive a damaged item?',
    content: 'If you receive a damaged item, please contact us immediately with photos of the damage, and we will arrange for a replacement or refund.',
  },
  {
    title: 'How do I cancel my order?',
    content: 'You can cancel your order within 24 hours of placing it by reaching out to us via email.',
  },
  {
    title: 'Can I use multiple discount codes on one order?',
    content: 'No, only one discount code can be applied per order.',
  },

  {
    title: 'How can I contact customer support?',
    content: 'You can contact our customer support team via email, found at the bottom of the website.',
  },
  {
    title: 'Do you offer bulk purchasing options?',
    content: 'Yes, we offer discounts for bulk purchases. Please contact our sales team for more information.',
  },
];






	return(
		<div id = 'About' >

				<div id = 'faq'>
					<h2>Frequently Asked Questions</h2>
					<Accordion items={faqGeneral} />

				</div>

		</div>
	)
}