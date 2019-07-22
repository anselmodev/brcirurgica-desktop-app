import VMasker from "vanilla-masker";

interface ConvertTo {
  toMoney: string;
  toNumber: string;
  toPattern: string;
}

interface OptionsVMasker {
    toSave?: boolean;
    precision?: number;
    separator?: string;
    delimiter?: string;
    unit?: string;
    suffixUnit?: string;
    zeroCents?: boolean;
}

const _getDomElement = (elementNode: any) => {
  return document.querySelector(elementNode);
};

/**
 * @description Set Mask to Input
 * @param {string} ConvertTo - 'toMoney', 'toNumber', 'toPattern'.
 * @param {string} inputClassId - class ou id do elemento.
 * @param {object} optionsVMasker - Objeto com as configurações personalizadas do VMasker.
 * @param {string} paternMask - String com o Pattern da máscara. Ex: '(99) 9999-9999'.
 * @link https://github.com/vanilla-masker/vanilla-masker
 */
export const inputMask = <C extends keyof ConvertTo>(
  convertTo: C,
  inputClassId: string,
  optionsVMasker?: object,
  paternMask?: string
) => {
  if (convertTo === "toMoney") {
    VMasker(_getDomElement(inputClassId)).maskMoney(optionsVMasker);
  }
  if (convertTo === "toNumber") {
    VMasker(_getDomElement(inputClassId)).maskNumber();
  }
  if (convertTo === "toPattern") {
    VMasker(_getDomElement(inputClassId)).maskPattern(paternMask || '');
  }
};

/**
 * @description Set Mask to Input
 * @param {string} ConvertTo - 'toMoney', 'toNumber', 'toPattern'.
 * @param {string|number} value - Valor para converter: { string | number }.
 * @param {object} optionsVMasker - Objeto com as configurações personalizadas do VMasker.
 * @param {string} paternMask - String com o Pattern da máscara. Ex: '(99) 9999-9999'.
 * @link https://github.com/vanilla-masker/vanilla-masker
 */
export const formatValue = <C extends keyof ConvertTo>(
  convertTo: C,
  value: number | string,
  optionsVMasker?: OptionsVMasker,
  paternMask?: string
) => {
  if (convertTo === "toMoney") {
    let convert;

    if(optionsVMasker && optionsVMasker.toSave) {
        convert = VMasker.toMoney(value, {...optionsVMasker, separator: '.'}).replace(/\./g, '');
        return [convert.slice(0, -2), ".", convert.slice(-2)].join('');
    } else {
        convert = VMasker.toMoney(value, optionsVMasker);
        return convert;
    }
  }
  if (convertTo === "toNumber") {
    return VMasker.toNumber(value);
  }
  if (convertTo === "toPattern") {
    return VMasker.toPattern(value, paternMask);
  }
};
