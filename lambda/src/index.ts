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
  const resp = {
    body: {
      success: true,
      luhn: luhn.generate('4454066197024125'),
    },
  };
  return response(resp);
};

export { handler };
