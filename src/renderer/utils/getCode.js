import bufferpack from 'bufferpack';
import CryptoJS from 'crypto-js';
import base32 from 'base32.js';
import jspack from './jspack';
import tfa from '2fa';
// # 动态码
const SECRET = 'UEEQZQEXNSVXDE4Z';
function calGoogleCode(secretKey) {
  let input = parseInt(Date.now() / 1000 / 30);
  let lens = secretKey.length;
  let lenn = lens % 4 ? lens % 4 : 8;
  let lenx = 8 - lenn;
  secretKey += '='.repeat(lenx);
  console.log(secretKey.length);
  //   buf = Buffer.from(secretKey, 'base32');
  let encoded = base32.encode(secretKey);
  const key = Buffer.from(encoded);
  //   let key = Buffer.from(buf, 'base32');
  //   let msg = jspack.Pack('>Q', input);
  //   let googleCode = CryptoJS.SHA1(key, msg);
  //   let b = googleCode.toString(CryptoJS.enc.Hex);
  //   let o = b[19].charCodeAt() & 15;
  //   console.log(o);
  //   googleCode = String(
  //     (jspack.Unpack('>I', googleCode.slice(o, o + 4))[0] & 0x7fffffff) % 1000000
  //   );
  //   if (googleCode.length == 5) {
  //     googleCode = '0' + googleCode;
  //   }
  let totp = tfa.generateCode(key, input);

  return totp;
}
console.log('asdfsssss', calGoogleCode(SECRET));

export default {
  calGoogleCode
};
