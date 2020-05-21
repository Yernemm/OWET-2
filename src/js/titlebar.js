const { Menu, MenuItem } = require('electron').remote;
const customTitlebar = require('custom-electron-titlebar');
const { ipcRenderer } = require('electron');
 
 let titlebar = new customTitlebar.Titlebar({
     backgroundColor: customTitlebar.Color.fromHex('#353638'),
    drag: true
 });

 const opn = require('better-opn');



const menu = new Menu();
/*
menu.append(new MenuItem({
    label: 'Info',
    submenu: [
        {
            label: 'Subitem 1',
            click: () => console.log('Click on subitem 1')
        },
        {
            type: 'separator'
        }
    ]
}));
 */
menu.append(new MenuItem({
    label: 'Help',
    submenu: [
        {
            label: 'Online Guide',
            click: () => opn("https://yernemm.xyz/posts/owet2guide")
        }
    ]
}));

menu.append(new MenuItem({
    label: 'Pages',
    submenu: [
        {
            label: 'Main Menu',
            click: () => document.location.href = "./../html/mainmenu.html"
        },
        {
            label: 'Item Browser',
            click: () => document.location.href = "./../html/wizard.html"
        },
        {
            label: 'DataTool GUI',
            click: () => document.location.href = "./../html/datatoolgui.html"
        },

        {
            label: 'Settings',
            click: () => document.location.href = "./../html/settings.html"
        },

    ]
}));

menu.append(new MenuItem({
    label: 'More',
    submenu: [
        {
            label: 'Open Output Folder',
            click: () => ipcRenderer.send('DtOpenOutputFolder',{})
        },
        {
            label: 'Open Current Log',
            click: () => ipcRenderer.send('DtOpenCurrentLog',{})
        },
        {
            label: 'Clear DataTool Cache',
            click: () => ipcRenderer.send('ClearCache',{})
        },


    ]
}));



/*

        {
            label: 'Conversion Tools',
            click: () => console.log('Click on subitem 1')
        },
        {
            label: 'Other Tools',
            click: () => console.log('Click on subitem 1')
        }

*/
 
titlebar.updateMenu(menu);