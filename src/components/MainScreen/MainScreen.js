import React from 'react';
import Pages from './Pages/Pages';
import Sidebar from './Sidebar/Sidebar';
const MainScreen = () => {
    return (
        <div>
            <div className="main_screen">
                <Pages></Pages>
                <Sidebar></Sidebar>
            </div>
        </div>
    )
}

export default MainScreen
