import React from 'react'
import PastSearches from './PastSearches'
import SideForm from './SideForm'
import Messages from './Messages'
const Sidebar = ({ params }) => {
    const { singlePageTitle, pastSearches, setsinglePageTitle, showMetaForm, singlePageSlug, setsinglePageSlug, Messages: msgs } = params;

    return (

        <div className="sidebar">
            {
                showMetaForm && <SideForm params={{ singlePageTitle, setsinglePageTitle, singlePageSlug, setsinglePageSlug }} />
            }

            <Messages params={{ msgs }}></Messages>
            <PastSearches params={{ pastSearches }}></PastSearches>

        </div>

    )
}

export default Sidebar
