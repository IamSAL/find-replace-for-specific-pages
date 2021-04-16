import React, { useContext, useEffect, useState } from 'react';
import { FRSPcontext } from '../../FRSP';

const PastSearches = () => {
    const { setsearchStr, pastSearches } = useContext(FRSPcontext)

    let prevSearches = [...pastSearches]

    return (
        <div className="past_searches">
            <h4 style={{ textAlign: "center" }}>Try Past Searches</h4>

            <ul>

                {
                    pastSearches && prevSearches.reverse().filter(str => str.length > 1).map(str => {
                        return <li onClick={() => setsearchStr(str)}>{str}</li>
                    })}
            </ul>
        </div>
    )
}

export default PastSearches
