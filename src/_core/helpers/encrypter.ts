import * as CryptoJS from "crypto-js";

const defaultSalt = 5;
const defaultSecret = "34902urwfj028ruf2g9uehrg";

type Enctypes = {
    data: string;
    secretKey?: string; 
    saltRounds?: number;
};

const _encode = (props: Enctypes) => {
  const setEncode = CryptoJS.AES.encrypt(
    props.data.toString(),
    (props.secretKey || defaultSecret) + (props.saltRounds || defaultSalt)
  );
  return setEncode.toString();
};

const _dencode = (props: Enctypes) => {
  const setDecode = CryptoJS.AES.decrypt(
    props.data,
    (props.secretKey || defaultSecret) + (props.saltRounds || defaultSalt)
  );

  return setDecode.toString(CryptoJS.enc.Utf8);
};

/**
 * [ Encrypter ]
 */
export const encrypter = {
    /**
     * Enconde -- { data, secretKey, saltRounds }
     * @param {string} data - String para codificação.
     * @param {string} secretKey - Chave para codificação.
     * @param {number} saltRounds - Opcional: Valor do salt para criptografia.
     * @returns {string} - Retorna string codificada.
     */
    encode(props: Enctypes) {
        return _encode(props);
    },
    /**
     * Decode -- { data, secretKey, saltRounds }
     * @param {string} data - String previamente codificada.
     * @param {string} secretKey - A mesma chave usada na codificação.
     * @param {number} saltRounds - Opcional: Valor do salt usado na criptografia.
     * @returns {string} - Retorna string decodificada.
     */
    decode(props: Enctypes) {
        return _dencode(props);
    }
};
