const appWindow = window as any;
const { ipcRenderer } = appWindow.require('electron');

export const isOnline = (getStatus: any) => {
    ipcRenderer.send('main-process-request', {
        type: 'IS_ONLINE',
        command: {status: getStatus}
    });
};