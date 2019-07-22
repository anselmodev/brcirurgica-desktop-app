const { ipcMain, dialog } = require("electron");
const Crud = require("./database/crud");

module.exports = props => {
    ipcMain.on("main-process-request", (event, { type, command, options }) => {
        switch (type) {

            case "IS_ONLINE":
                    const { status } = command;
                        console.log('Está Onine? ', status);
                    break;
                    
            case "CRUD_DB":
                const { sql, opt } = command;
                Crud(sql, opt)
                    .then(result => {
                        event.sender.send("db-response", result);
                    })
                    .catch(err => {
                        dialog.showErrorBox('Houve Algum Erro na Consulta', `
                        Code: ${err.data.code}
                        Errno: ${err.data.errno}
                        SqlMessage: ${err.data.sqlMessage}
                        SqlState: ${err.data.sqlState}
                        Index: ${err.data.index}
                        Sql: ${err.data.sql}
                        `);
                        event.sender.send("db-response", undefined);
                    });

                break;

            default:
                break;
        }
    });
};
