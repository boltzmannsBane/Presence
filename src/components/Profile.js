import React from 'react'
import Header from './Header'
import Drawer from './Drawer'
import Divider from '@material-ui/core/Divider';

export const Profile = ({ history, match: { params: { id } } }) => {

    let ratio = window.innerHeight > window.innerWidth

    return <>
        <nav style={ratio ? {background: 'linear-gradient(to right, #caa0c3, #eb7944)'}: {}}>
            <h2>プレゼンス</h2>
            <Drawer id={id} />
        </nav>
        <Divider />
        <Header id={id} history={history}/>
        <Divider />
    </>

}