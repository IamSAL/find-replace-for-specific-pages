import React from 'react';
import Pages from './Pages/Pages';
import Sidebar from './Sidebar/Sidebar';
import { PageProvider } from '../../contexts/PageContext'
const MainScreen = () => {
    return (
        <div>
            <div className="main_screen">
                <PageProvider>
                    <Pages></Pages>
                </PageProvider>
                <Sidebar></Sidebar>
            </div>
        </div>
    )
}

export default MainScreen
