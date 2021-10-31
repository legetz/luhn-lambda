import { decryptValue } from './kms';

import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { DecryptRequest } from 'aws-sdk/clients/kms';

describe('decryptValue function', () => {
  it('should return string', async () => {
    AWSMock.setSDKInstance(AWS);
    type CallbackFunction = (error: Error, data: { Plaintext: string }) => void;
    AWSMock.mock('KMS', 'decrypt', (params: DecryptRequest, callback: CallbackFunction) => {
      callback(null, { Plaintext: 'test' });
    });

    const resp = await decryptValue('lskjglksjglsg');
    expect(resp).toBe('test');
    AWSMock.restore('KMS');
  });
  it('should throw exception', async () => {
    try {
      await decryptValue('test');
    } catch (e) {
      expect(e.message).toBe('An error occured trying to decrypt value');
    }
  });
});
