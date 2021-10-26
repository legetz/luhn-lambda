const luhn = require('luhn-js');

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const response = ({ statusCode = 200, headers = defaultHeaders, body }: ResponseInput): Response => {
  return {
    statusCode,
    headers,
    body,
  };
};

const handler = (event, context, callback): void => {
  if (event) {
    console.log('Incoming event: ', event);
  }
  const newLuhn = luhn.generate('4454066197024125');
  console.log(`Generated ${newLuhn}`);

  const resp = {
    body: JSON.stringify({
      success: true,
      luhn: newLuhn,
    }),
  };
  callback(null, response(resp));
};

export { handler };
