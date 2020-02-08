const { Menu, MenuItem } = require('electron').remote
            const customTitlebar = require('custom-electron-titlebar');
 
 let titlebar = new customTitlebar.Titlebar({
     backgroundColor: customTitlebar.Color.fromHex('#353638'),
    drag: true
 });



const menu = new Menu();
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
 
menu.append(new MenuItem({
    label: 'Help',
    submenu: [
        {
            label: 'Subitem checkbox',
            type: 'checkbox',
            checked: true
        },
        {
            type: 'separator'
        },
        {
            label: 'Subitem with submenu',
            submenu: [
                {
                    label: 'Submenu &item 1',
                    accelerator: 'Ctrl+T'
                }
            ]
        }
    ]
}));

menu.append(new MenuItem({
    label: 'Pages',
    submenu: [
        {
            label: 'Main Menu',
            click: () => console.log('Click on subitem 1')
        },
        {
            label: 'DataTool GUI',
            click: () => console.log('Click on subitem 1')
        },
        {
            label: 'Conversion Tools',
            click: () => console.log('Click on subitem 1')
        },
        {
            label: 'Other Tools',
            click: () => console.log('Click on subitem 1')
        }
    ]
}));
 
titlebar.updateMenu(menu);