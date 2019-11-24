import React from 'react'
import { Header } from './Header'
import Drawer from './Drawer'

export const Profile = ({ match: { params: { id } } }) => {
    
    return <>
    <h2>プレゼンス</h2>
    <Drawer id={id}/>
    <Header id={id}/>
    </>

}