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
    switch (event.path) {
      case '/generate':
        if (event.httpMethod === 'GET' && event.queryStringParameters?.startNumber) {
          const amount = parseInt(event.queryStringParameters.amount, 10) || 1;
          if (amount > 100000) {
            const resp = {
              statusCode: 400,
              body: JSON.stringify({
                errorMessage: 'amount must be under 100000',
              }),
            };
            callback(null, response(resp));
            return;
          }
          const startNum = parseInt(event.queryStringParameters.startNumber, 10);

          const resultList = [];
          let nextNum = startNum;
          for (let i = 0; i < amount; i++) {
            resultList.push(luhn.generate(nextNum.toString()));
            nextNum++;
          }

          const resp = {
            body: JSON.stringify({
              amount,
              results: resultList,
            }),
          };
          callback(null, response(resp));
        } else {
          const resp = {
            statusCode: 400,
            body: JSON.stringify({
              errorMessage: 'Specify startNumber and use HTTP GET',
            }),
          };
          callback(null, response(resp));
        }
        return;
      case '/validate':
        if (event.httpMethod === 'GET' && event.queryStringParameters?.number) {
          const resp = {
            body: JSON.stringify({
              number: event.queryStringParameters.number,
              isValid: luhn.isValid(event.queryStringParameters.number),
            }),
          };
          callback(null, response(resp));
        } else {
          const resp = {
            statusCode: 400,
            body: JSON.stringify({
              errorMessage: 'Specify number and use HTTP GET',
            }),
          };
          callback(null, response(resp));
        }
        return;
      default:
        break;
    }
  }
  callback(
    null,
    response({
      statusCode: 404,
      body: null,
    })
  );
};

export { handler };
