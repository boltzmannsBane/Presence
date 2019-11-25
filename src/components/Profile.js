import React from 'react'
import Header from './Header'
import Drawer from './Drawer'
import Divider from '@material-ui/core/Divider';

export const Profile = ({ history, match: { params: { id } } }) => {

    return <>
        <nav>
            <h2>プレゼンス</h2>
            <Drawer id={id} />
        </nav>
        <Divider />
        <Header id={id} history={history}/>
        <Divider />
    </>

}