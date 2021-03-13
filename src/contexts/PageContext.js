import React, { useState, createContext, useEffect } from 'react'

export const PageContext = createContext();

export const PageProvider = (props) => {
    const [pages, setPages] = useState([]);
    return (
        <PageContext.Provider value={[pages, setPages]}>

            {props.children}
        </PageContext.Provider>
    )
}


