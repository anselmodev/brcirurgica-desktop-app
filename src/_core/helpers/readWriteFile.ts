const appWindow = window as any;
const fs = appWindow.require("fs");
const path = appWindow.require("path");
const electron = appWindow.require("electron");
const _userDataPath = (electron.app || electron.remote.app).getPath("userData");

export const SYSTEM_PATHS = {
  security: path.join(`${_userDataPath}/security`),
  notes: path.join(`${_userDataPath}/notes`),
  backups: path.join(`${_userDataPath}/backups`),
  config: path.join(`${_userDataPath}/config`),
  base: path.join(`${_userDataPath}`)
};
export const SYSTEM_FILES = {
  loginLogout: `login-logout.dt`,
  notes: `notes.dt`,
  backupDatabase: `backup.sql`,
  config: `config.dt`
};
const _writeFile = async (fileToSave: string, data: string) => {
  return await fs.writeFileSync(fileToSave, data, { flag: "w" });
};

export const writeFile = (local: string, data: string, fileName: string) => {
  return new Promise((resolve, reject) => {
    const fileToSave = `${local}/${fileName}`;
    let resultWrite;

    if (!fs.existsSync(local)) {
      fs.mkdir(local, (err: any) => {
        if (err) {
          reject(err);
          return false;
        }
        resultWrite = _writeFile(fileToSave, data);
      });
    } else {
      resultWrite = _writeFile(fileToSave, data);
    }
    resolve(resultWrite);
  });
};

export const readFile = (file: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err: any, data: any) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(data);
    });
  });
};
