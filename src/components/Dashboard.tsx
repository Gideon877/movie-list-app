import * as React from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { Subscriptions, Menu as MenuIcon, Home as HomeIcon, Person, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useAuthStore } from '../store/useAuthStore';
import Pages from '../Pages';
import Menu from './Menu';
import { useAppStore } from '../store/useAppStore';

interface Props {
    window?: () => Window;
}

interface NavItem {
    title: string;
    icon: React.ReactElement;
    href: string;
}

const drawerWidth = 240;
const navItems: NavItem[] = [
    {
        title: 'Favorites',
        icon: <Subscriptions fontSize='large' color='secondary' />,
        href: '/favorites',
    },
    {
        title: 'Profile',
        icon: <Person fontSize='large' color='inherit' />,
        href: '/',
    },
    {
        title: 'Logout',
        icon: <ExitToAppIcon fontSize='large' color='error' />,
        href: '/logout',
    },
];

export default function Dashboard(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const logout = useAuthStore((state) => state.logout);
    const setActiveView = useAppStore((state) => state.setActiveView);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };



    const onChangeMenu = (title: string | null) => {
        if (title === 'Logout') {
            logout();
        } else {
            setActiveView(title);
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Menu data={navItems} />
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box >
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon fontSize='large' />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <IconButton onClick={() => onChangeMenu('Home')}>
                            <HomeIcon fontSize='large' />
                        </IconButton>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item, index) => (
                            <IconButton key={index} onClick={() => onChangeMenu(item.title)}>
                                {item.icon}
                            </IconButton>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <>
                <Pages drawerWidth={drawerWidth} />
            </>
        </Box>
    );
}
