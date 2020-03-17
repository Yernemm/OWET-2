const { Menu, MenuItem } = require('electron').remote
            const customTitlebar = require('custom-electron-titlebar');
 
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
            label: 'DataTool GUI',
            click: () => document.location.href = "./../html/datatoolgui.html"
        },

        {
            label: 'Settings',
            click: () => document.location.href = "./../html/settings.html"
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