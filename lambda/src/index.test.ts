import { handler } from './index';

describe('handler function', () => {
  it('should return 404 when no event is given', done => {
    function callback(error, resp): void {
      try {
        expect(resp?.statusCode).toBe(404);
        expect(resp.body).toBe(null);
        done();
      } catch (e) {
        done(e);
      }
    }
    handler(null, null, callback);
  });
  it('should return 404 when odd event is given', done => {
    function callback(error, resp): void {
      try {
        expect(resp?.statusCode).toBe(404);
        expect(resp.body).toBe(null);
        done();
      } catch (e) {
        done(e);
      }
    }
    handler({}, null, callback);
  });
});

describe('handler function, generate path', () => {
  it('should return 100 numbers', done => {
    function callback(error, resp): void {
      try {
        expect(resp?.statusCode).toBe(200);
        const body = JSON.parse(resp.body);
        expect(body.amount).toBe(100);
        expect(body.results.length).toBe(100);
        expect(body.results[0]).toBe('1008');
        done();
      } catch (e) {
        done(e);
      }
    }
    const event = {
      path: '/generate',
      queryStringParameters: {
        number: '100',
        amount: 100,
      },
    };
    handler(event, null, callback);
  });
  it('should block if amount > 100000', done => {
    function callback(error, resp): void {
      try {
        expect(resp?.statusCode).toBe(400);
        expect(resp.body).toBe('{"errorMessage":"amount must be under 100000"}');
        done();
      } catch (e) {
        done(e);
      }
    }
    const event = {
      path: '/generate',
      queryStringParameters: {
        number: '1000',
        amount: 1000000,
      },
    };
    handler(event, null, callback);
  });
  it('should detect bad number', done => {
    function callback(error, resp): void {
      try {
        expect(resp?.statusCode).toBe(400);
        expect(resp.body).toBe('{"errorMessage":"Specify valid number parameter"}');
        done();
      } catch (e) {
        done(e);
      }
    }
    const event = {
      path: '/generate',
      queryStringParameters: {
        number: 'test',
        amount: 1000000,
      },
    };
    handler(event, null, callback);
  });
});

describe('handler function, validate path', () => {
  it('should detect missing number', done => {
    function callback(error, resp): void {
      try {
        expect(resp?.statusCode).toBe(400);
        expect(resp.body).toBe('{"errorMessage":"Specify valid number parameter"}');
        done();
      } catch (e) {
        done(e);
      }
    }
    const event = {
      path: '/validate',
    };
    handler(event, null, callback);
  });
  it('should handle valid number', done => {
    function callback(error, resp): void {
      try {
        expect(resp?.statusCode).toBe(200);
        const body = JSON.parse(resp.body);
        expect(body.number).toBe('1008');
        expect(body.isValid).toBe(true);
        done();
      } catch (e) {
        done(e);
      }
    }
    const event = {
      path: '/validate',
      queryStringParameters: {
        number: '1008',
      },
    };
    handler(event, null, callback);
  });
});
