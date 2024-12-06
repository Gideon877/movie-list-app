import React, { Fragment } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useAuthStore } from '../store/useAuthStore';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';



interface MenuItem {
    title: string;
    icon: React.ReactNode;
}

interface MenuProps {
    data: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ data }) => {

    const { setActiveView } = useAppStore();
    const { logout } = useAuthStore();

    const onChangeMenu = (title: string | null) => {
        if (title === 'Logout') {
            logout();
        } else {
            setActiveView(title);
        }
    }
    return (
        <Fragment>
            <Typography variant="h6" sx={{ my: 2 }}>
                <ListItemIcon onClick={() => onChangeMenu('Home')}>
                    <Home />
                </ListItemIcon>
            </Typography>
            <Divider />
            <List>
                {data.map((menu, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => onChangeMenu(menu.title)}>
                            <ListItemIcon>
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText primary={menu.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    )
}

export default Menu