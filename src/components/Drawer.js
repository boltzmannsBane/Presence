import React, { useContext, Fragment } from 'react';
import { AuthContext } from './context/AuthContext'
import { NavLink as Link } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


export default function SwipeableTemporaryDrawer({ id }) {

    const { authStatus } = useContext(AuthContext)

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {authStatus && authStatus.uid === id &&

                    <Link to={`/${id}`}>
                        <ListItem button>
                            <ListItemIcon>< HomeIcon /></ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>
                    </Link>}

                <ListItem button>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary='Edit Profile' />
                </ListItem>


                <ListItem button>
                    <ListItemIcon><MobileScreenShareIcon /></ListItemIcon>
                    <ListItemText primary='Share Profile' />
                </ListItem>

                {authStatus ? <ListItem button>
                    <ListItemIcon>< PowerSettingsNewIcon /></ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItem> :
                    <>
                        <Link to='/'>
                            <ListItem button>
                                <ListItemIcon>< VpnKeyIcon /></ListItemIcon>
                                <ListItemText primary='Login' />
                            </ListItem>
                        </Link>

                        <Link to='/register'>
                            <ListItem button>
                                <ListItemIcon>< ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary='Register' />
                            </ListItem>
                        </Link>
                    </>}

            </List>
        </div>
    );


    return (
        <div>
            <Button onClick={toggleDrawer('right', true)}><MenuIcon /></Button>
            <SwipeableDrawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                {sideList('right')}
            </SwipeableDrawer>
        </div>
    )
}