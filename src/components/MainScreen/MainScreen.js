import React, { useState } from 'react';
import Pages from './Pages/Pages';
import Sidebar from './Sidebar/Sidebar';
const MainScreen = ({ params }) => {
    const [showMetaForm, setshowMetaForm] = useState(true)
    const { pages, singlePageTitle, setsinglePageTitle, pastSearches, singlePageSlug, setsinglePageSlug, setfinalData, Messages } = params;
    return (
        <div>
            <div className="main_screen">
                <Pages params={{ pages, singlePageTitle, setsinglePageTitle, showMetaForm, setshowMetaForm, singlePageSlug, setsinglePageSlug, setfinalData }}></Pages>
                <Sidebar params={{ singlePageTitle, setsinglePageTitle, pastSearches, showMetaForm, singlePageSlug, setsinglePageSlug, Messages }}></Sidebar>
            </div>
        </div>
    )
}

export default MainScreen
