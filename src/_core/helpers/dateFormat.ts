import moment from "moment";
import momentTimezone from "moment-timezone";
import 'moment/locale/pt-br';

moment.locale("pt-br");
const timezoneString = "America/Sao_Paulo";

interface Calendar {
  Operator: {
    add: string;
    subtract: string;
  };
  FormatDate: {
    L: string;
    LT: string;
    LTS: string;
    LL: string;
    LLL: string;
    LLLL: string;
    l: string;
    ll: string;
    lll: string;
    llll: string;
  };
}

/**
 * [ Calendar ]
 * @param {string} operator "add" para adicionar ou "subtract" para subtrair dias nas datas.
 * @param {number} numberDays número de dias para o cálculo.
 * @param {string} dateValue EX: "2019-01-02 00:00:00" - default (get dateNow),
 * @param formatDate OPTIONS:
 * @type {undefined} Default: "YYYY-MM-DD HH:mm:ss"
 * @type {string} "LT" = 08:58
 * @type {string} "LTS" = 08:58:00
 * @type {string} "L" = 22/03/2019
 * @type {string} "l" = 22/3/2019
 * @type {string} "LL" = 22 de Março de 2019
 * @type {string} "ll" = 22 de Mar de 2019
 * @type {string} "LLL" = 22 de Março de 2019 às 08:58
 * @type {string} "lll" = 22 de Mar de 2019 às 08:58
 * @type {string} "LLLL" = Sexta-Feira, 22 de Março de 2019 às 08:58
 * @type {string} "llll" = Sex, 22 de Mar de 2019 às 08:58
 * @see Docs: http://momentjs.com/docs/#/manipulating/add/
 */
export const calendarDate = <
  O extends keyof Calendar["Operator"],
  F extends keyof Calendar["FormatDate"]
>(
  operator?: O,
  numberDays?: number,
  dateValue?: string,
  formatDate?: F
) => {
  if (operator === "subtract") {
    return momentTimezone(dateValue)
      .tz(timezoneString)
      .subtract(numberDays, "days")
      .format(formatDate);
  } else if (operator === "add") {
    return momentTimezone(dateValue)
      .tz(timezoneString)
      .add(numberDays, "days")
      .format(formatDate);
  } else {
    return momentTimezone(dateValue)
      .tz(timezoneString)
      .format(formatDate);
  }
};
