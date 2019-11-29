import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext'
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function PostOptions({ history, elementName, handleDelete, id, tweetId }) {

    const { authStatus } = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = useState(null)

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const link = `https://presenceweb.app/users/${id}/${elementName}/${tweetId}`

    return (
        <>

            <button variant="contained" onClick={handlePopoverOpen}>
                <MoreHorizIcon />
            </button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{ padding: '5px' }}>
                    <List onClick={handlePopoverClose}>
                        {authStatus && authStatus.uid === id && <ListItem button onClick={(e) => {
                            e.preventDefault()
                            handleDelete(tweetId)
                            elementName === 'galleryPost' && history.replace(`/users/${id}/gallery`)
                            elementName === 'tweet' && history.replace(`/users/${id}/tweets`)
                        }}>
                            <ListItemIcon><DeleteForeverIcon /></ListItemIcon>
                            <ListItemText primary='delete' />
                        </ListItem>}
                        <CopyToClipboard text={link}>
                        <ListItem button>
                            <ListItemIcon><ShareIcon /></ListItemIcon>
                            <ListItemText primary='copy link' />
                        </ListItem>
                        </CopyToClipboard>
                    </List>
                </div>
        </Popover>
        </>
    )
}

export default withRouter(PostOptions)