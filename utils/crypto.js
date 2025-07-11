import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'munisys$#@123654';

export function aesEncrypt(word) {
  const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

export function aesDecrypt(word){
  if(false) return word;
    var key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}