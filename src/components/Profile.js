import React, { useContext } from 'react'
import {AuthContext} from './context/AuthContext'
import { NavLink as Link } from 'react-router-dom';
import Header from './Header'
import Drawer from './Drawer'
import Divider from '@material-ui/core/Divider';

export const Profile = ({ history, match: { params: { id } } }) => {

    const { authStatus } = useContext(AuthContext)

    let ratio = window.innerHeight > window.innerWidth

    return <>
        <nav style={ratio ? {background: 'linear-gradient(to right, #caa0c3, #eb7944)'}: {}}>
            <Link to={authStatus ? `/users/${authStatus.uid}/gallery` : `/users/${id}/gallery`}><h2>プレゼンス</h2></Link>
            <Drawer id={id} />
        </nav>
        <Divider />
        <Header id={id} history={history}/>
        <Divider />
    </>

}