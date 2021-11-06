import aesjs from "aes-js";
import sha1 from "js-sha1";
import crypto from "crypto";
import store from '../../redux/store'

export const CryptoHelper = {
    decrypt({hash, key} = {}) {
        const {user: {Password: key_ = key} = {}} = store.getState().app
        try {
            if (!hash || !key_) return '';
            const key_Buffer = new Buffer(key_.substring(0, 24), "utf8");
            const iv = new Buffer("b53af22ceee25d5c", "utf8");
            const encryptedBytes = new Buffer(hash, "base64");
            const aesCbc = new aesjs.ModeOfOperation.cbc(key_Buffer, iv);
            const decryptedBytes = aesCbc.decrypt(encryptedBytes);
            const last = decryptedBytes[decryptedBytes.length - 1];
            const decrypted = new Buffer(decryptedBytes.slice(0, -last), "utf8")
            return decrypted.toString()
        } catch (e) {
            return hash || 'کارت نا معتبر'
        }
    },
    encryptPassword({phoneNumber, password}) {
        return sha1(phoneNumber + password);
    },
    PasargadEncrypt(data) {
        const {key1, key2} = store.getState().pasargad

        const ENC_KEY = key2;
        const IV = key1;

        const phrase = JSON.stringify(data);

        let cipher = crypto.createCipheriv('aes-128-cbc', ENC_KEY, IV);
        let encrypted = cipher.update(phrase, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    },
    PasargadDecrypt({encrypted}) {
        const {key1, key2} = store.getState().pasargad

        const ENC_KEY = key2;
        const IV = key1;

        let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
        let decrypted = decipher.update(encrypted, 'base64', 'utf8');
        return (decrypted + decipher.final('utf8'));
    },
}