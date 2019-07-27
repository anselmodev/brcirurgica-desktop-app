import { SYSTEM_PATHS, SYSTEM_FILES, readFile, writeFile } from "../helpers";
const windowAppObj = window as any;
const fs = windowAppObj.require("fs");

/*  [ JSON SCHEMA ]
  {
    notifications: true
  }
*/

interface DataSave {
  wallpaper?: string;
  notifications?: boolean;
}
const _writeFileConfig = (dataToSave: DataSave): Promise<object> => {
  return new Promise(
    (resolve, reject): void => {
      writeFile(
        SYSTEM_PATHS.config,
        JSON.stringify(dataToSave),
        SYSTEM_FILES.config
      )
        .then(() => {
          resolve({
            success: true
          });
        })
        .catch(err => {
          resolve({
            success: false,
            message: err
          });
        });
    }
  );
};

export const getSystemConf = (): Promise<object | boolean> => {
  return new Promise((resolve, reject) => {
    const localFile = `${SYSTEM_PATHS.config}/${SYSTEM_FILES.config}`;

    fs.access(localFile, fs.constants.F_OK, (err: any) => {
      if (!err) {
        readFile(localFile)
          .then((result: any) => {
            const resultData = JSON.parse(result);
            resolve({
              dataConfig: resultData
            });
          })
          .catch((e: string) => {
            console.log(e);
            alert("Erro de sistema ao ler configurações do sistema!");
          });
      } else {
        resolve({
          errorMessage: err
        });
      }
    });
  });
};

export const setSystemConf = (dataToSave: DataSave): Promise<object> => {
  return new Promise(
    (resolve, reject): void => {
      // check folder exists
      if (!fs.existsSync(`${SYSTEM_PATHS.config}/${SYSTEM_FILES.config}`)) {

        _writeFileConfig(dataToSave).then((res: any) => {
          if(!res.success) {
            resolve(res);
          } else {
            resolve({
              dataConfig: dataToSave
            });
          }
        });

      } else {
        // read local config
        getSystemConf()
          .then((resultConf: any) => {
            if (resultConf.errorMessage) {
              resolve(resultConf);
            } else {
              // update JSON data
              const dataUpd = {
                ...resultConf.dataConfig,
                ...dataToSave
              };
              // write file
              _writeFileConfig(dataUpd).then((res: any) => {
                if(!res.success) {
                  resolve(res);
                } else {
                  resolve({
                    dataConfig: dataUpd
                  });
                }
              });
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  );
};
