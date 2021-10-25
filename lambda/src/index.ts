const defaultHeaders = {
  'Content-Type': 'application/json',
};

const response = ({ statusCode, headers = defaultHeaders, body }: ResponseInput): Response => {
  return {
    statusCode,
    headers,
    body,
  };
};

const handler = (): Response => {
  return response({ statusCode: 200, body: '{success: true}' });
};

export { handler };
