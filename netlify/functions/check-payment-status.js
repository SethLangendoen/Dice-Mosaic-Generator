exports.handler = async (event, context) => {
	const { sessionId } = event.queryStringParameters;
  
	// Check the payment status for the given session ID
	const status = paymentStatus[sessionId] || 'pending';
  
	return {
	  statusCode: 200,
	  body: JSON.stringify({ status }),
	};
  };
  

  