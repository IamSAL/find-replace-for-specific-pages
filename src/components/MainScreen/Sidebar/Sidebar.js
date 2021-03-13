import React from 'react'
import PastSearches from './PastSearches'
import SideForm from './SideForm'
import Messages from './Messages'
const Sidebar = () => {
    return (

        <div className="sidebar">
            <SideForm></SideForm>
            <Messages></Messages>
            <PastSearches></PastSearches>

        </div>

    )
}

export default Sidebar
