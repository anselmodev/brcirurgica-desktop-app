const { app, Menu, shell } = require('electron');
const isDev = require('electron-is-dev');
const menuLabels = require('./labels');

class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  };

  buildMenu() {
    if ( isDev ) {
      this.setupDevelopmentEnvironment();
    }

    const template = process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
          Menu.setApplicationMenu(menu);

    return menu;
  };

  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: menuLabels.developerLabels.inspectElement,
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        },
        { type: 'separator' },
        {
          label: menuLabels.developerLabels.developerTools,
          click: () => {
            this.mainWindow.openDevTools();
          }
        },
        { type: 'separator' },
        {
          label: menuLabels.developerLabels.reloadContent,
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        }
      ]).popup(this.mainWindow);
    });
  };

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: app.getName(),
      submenu: [
        {
          label: menuLabels.subMenuAbout.nameApp,
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        {
          label: menuLabels.subMenuAbout.exitApp,
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuEdit = {
      label: menuLabels.subMenuEdit.label,
      submenu: [
        { label: menuLabels.subMenuEdit.undo, accelerator: 'Command+Z', selector: 'undo:' },
        { label: menuLabels.subMenuEdit.redo, accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: menuLabels.subMenuEdit.cut, accelerator: 'Command+X', selector: 'cut:' },
        { label: menuLabels.subMenuEdit.copy, accelerator: 'Command+C', selector: 'copy:' },
        { label: menuLabels.subMenuEdit.paste, accelerator: 'Command+V', selector: 'paste:' },
        {
          label: menuLabels.subMenuEdit.selectAll,
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    };
    const subMenuViewDev = {
      label: menuLabels.subMenuViewDev.label,
      submenu: [
        {
          label: menuLabels.subMenuViewDev.reload,
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: menuLabels.subMenuViewDev.fullScreen,
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: menuLabels.subMenuViewDev.developerTools,
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: menuLabels.subMenuViewProd.label,
      submenu: [
        {
          label: menuLabels.subMenuViewProd.fullScreen,
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        { type: 'separator' },
        {
          label: menuLabels.subMenuViewProd.hideAppplication,
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: menuLabels.subMenuViewProd.hideOthers,
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        { label: 'Show All', selector: 'unhideAllApplications:' }
      ]
    };
    const subMenuHelp = {
      label: menuLabels.subMenuHelp.label,
      submenu: [
        {
          label: menuLabels.subMenuHelp.aboutDev,
          click() {
            shell.openExternal('http://anselmodev.com');
          }
        },
        {
          label: menuLabels.subMenuHelp.errorsReport,
          click() {
            console.log('Reportar Erros!');
          }
        }
      ]
    };

    const subMenuView = process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    return [
      subMenuAbout,
      subMenuEdit,
      subMenuView,
      subMenuHelp
    ];
  };

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: menuLabels.templateDefault.file,
        submenu: [
          {
            label: menuLabels.templateDefault.nameApp,
            selector: 'orderFrontStandardAboutPanel:'
          },
          { type: 'separator' },
          {
            label: menuLabels.templateDefault.exitApp,
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            }
          }
        ]
      },
      {
        label: menuLabels.templateDefault.edit,
        submenu: [
          { label: menuLabels.templateDefault.undo, accelerator: 'Control+Z', selector: 'undo:' },
          { label: menuLabels.templateDefault.redo, accelerator: 'Shift+Control+Z', selector: 'redo:' },
          { type: 'separator' },
          { label: menuLabels.templateDefault.cut, accelerator: 'Control+X', selector: 'cut:' },
          { label: menuLabels.templateDefault.copy, accelerator: 'Control+C', selector: 'copy:' },
          { label: menuLabels.templateDefault.paste, accelerator: 'Control+V', selector: 'paste:' },
          {
            label: menuLabels.templateDefault.selectAll,
            accelerator: 'Control+A',
            selector: 'selectAll:'
          }
        ]
      },
      {
        label: menuLabels.templateDefault.view,
        submenu:
           [
              {
                label: menuLabels.templateDefault.fullScreen,
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(
                    !this.mainWindow.isFullScreen()
                  );
                }
              }
            ]
      },
      {
        label: menuLabels.templateDefault.help,
        submenu: [
          {
            label: menuLabels.templateDefault.aboutDev,
            click() {
              shell.openExternal('http://anselmodev.com');
            }
          },
          {
            label: menuLabels.templateDefault.errorsReport,
            click() {
              console.log('Reportar Erros!');
            }
          }
        ]
      }
    ];
    return templateDefault;
  };
};

module.exports = MenuBuilder;