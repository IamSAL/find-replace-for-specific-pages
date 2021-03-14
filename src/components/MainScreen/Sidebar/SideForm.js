import React from 'react'

const SideForm = ({ params }) => {
    const { singlePageTitle, setsinglePageTitle, singlePageSlug, setsinglePageSlug } = params;
    return (
        <div className="page_prop_form">
            <input type="text" placeholder="New title" onChange={(e) => setsinglePageTitle(e.target.value)} value={singlePageTitle} />
            <input type="text" placeholder="New slug" onChange={(e) => setsinglePageSlug(e.target.value)} value={singlePageSlug} />
        </div>
    )
}

export default SideForm
