import React, { useEffect, Fragment } from 'react'
import { Header } from './Header'

export const Profile = ({ match: { params: { id } } }) => {
    
    useEffect(() => {
        console.log(id)
    })

    return <Fragment>
        <h1>Profile Component</h1>
        <Header id={id}/>

    </Fragment>


}