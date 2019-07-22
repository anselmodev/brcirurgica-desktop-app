const appWindow = window as any;
const { ipcRenderer } = appWindow.require('electron');

export const requestDb = (callback: Function) => {
    ipcRenderer.once('db-response', (event: any, result: any) => {
        callback(result);
    });
};

export const crudDb = (sql: string, options: any) => {
    ipcRenderer.send('main-process-request', {
        type: 'CRUD_DB',
        command: {sql, options}
    });
};