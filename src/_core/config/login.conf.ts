import {
  calendarDate,
  encrypter,
  SYSTEM_PATHS,
  SYSTEM_FILES,
  readFile,
  writeFile
} from "../helpers";

const windowAppObj = window as any;
const fs = windowAppObj.require("fs");

export const getLogin = (): Promise<object | boolean> => {
  return new Promise((resolve, reject) => {
    const localFile = `${SYSTEM_PATHS.security}/${SYSTEM_FILES.loginLogout}`;

    if (!fs.existsSync(SYSTEM_PATHS.security)) {
      fs.mkdir(SYSTEM_PATHS.security, (err: any) => {
        if (err) {
          reject(err);
          return false;
        }
      });
    }

    fs.access(localFile, fs.constants.F_OK, (err: any) => {
      if (!err) {
        readFile(localFile)
          .then((result: any) => {
            const resultData = JSON.parse(result);
            const loginData = JSON.parse(
              encrypter.decode({ data: resultData.token })
            );
            const checkKeys = Object.keys(loginData);

            if (checkKeys[0] === "user" && checkKeys[1] === "password") {
              resolve({
                dataLogin: {
                  ...loginData,
                  dateLogin: resultData.dateLogin,
                  expireOn: resultData.expireOn
                }
              });
            } else {
              resolve({
                errorMessage: true
              });
            }
          })
          .catch((e: string) => {
            console.log(e);
            alert("Erro de sistema ao ler dados de login!");
          });
      } else {
        resolve({
            errorMessage: true
        });
      }
    });
  });
};
export const setLogin = (getValues: { user: string; password: string; }): Promise<object | boolean> => {
  return new Promise(
    (resolve, reject): void => {
      // check user and password on DATABASE

      const token = encrypter.encode({ data: JSON.stringify(getValues) });
      const dateLogin = calendarDate();
      const expireOn = calendarDate("add", 7);

      writeFile(
        SYSTEM_PATHS.security,
        JSON.stringify({
          token,
          dateLogin,
          expireOn
        }),
        SYSTEM_FILES.loginLogout
      )
        .then(() => {
          resolve({
            dataLogin: { ...getValues, dateLogin, expireOn }
          });
        })
        .catch(err => {
          resolve({
            errorMessage: true
          });
        });
    }
  );
};
