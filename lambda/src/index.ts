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

const handler = (): Response => {
  const newLuhn = luhn.generate('4454066197024125');
  console.log(`Generated ${newLuhn}`);
  const resp = {
    body: {
      success: true,
      luhn: newLuhn,
    },
  };
  return response(resp);
};

export { handler };
