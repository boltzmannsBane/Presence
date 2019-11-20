import React, { Fragment } from 'react'
import { Header } from './Header'
import Drawer from './Drawer'

export const Profile = ({ match: { params: { id } } }) => {
    
    return <>
    <Drawer />
    <Header id={id}/>
    </>

}