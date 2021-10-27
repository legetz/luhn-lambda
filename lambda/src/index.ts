import { isNumberString } from 'class-validator';

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
    const givenNumber = event.queryStringParameters?.number;
    switch (event.path) {
      case '/generate':
        if (givenNumber && isNumberString(givenNumber)) {
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
          const startNum = parseInt(givenNumber, 10);

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
              errorMessage: 'Specify valid number parameter',
            }),
          };
          callback(null, response(resp));
        }
        return;
      case '/validate':
        if (givenNumber) {
          const resp = {
            body: JSON.stringify({
              number: givenNumber,
              isValid: isNumberString(givenNumber) && luhn.isValid(givenNumber),
            }),
          };
          callback(null, response(resp));
        } else {
          const resp = {
            statusCode: 400,
            body: JSON.stringify({
              errorMessage: 'Specify valid number parameter',
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
