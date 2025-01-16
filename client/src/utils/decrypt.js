import CryptoJS from 'crypto-js';

const CRYPTO_SECRET = import.meta.env.VITE_API_CRYPTOSECRET

export async function decrypt(text) {
    return new Promise((resolve, reject) => {
        try {
            let textParts = text.split(':');
            let iv = CryptoJS.enc.Hex.parse(textParts[0]);
            let encryptedText = CryptoJS.enc.Hex.parse(textParts[1]);
            let key = CryptoJS.enc.Hex.parse(CRYPTO_SECRET);

            let decrypted = CryptoJS.AES.decrypt(
                { ciphertext: encryptedText },
                key,
                { iv: iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding }
            );
            resolve(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}