import React, { useEffect, useState } from 'react';

const PastSearches = ({ params }) => {

    const { pastSearches } = params;
    let prevSearches = [...pastSearches]

    return (
        <div className="past_searches">
            <h4>Past Searches</h4>
            <ul>

                {
                    pastSearches && prevSearches.reverse().filter(str => str.length > 1).map(str => {
                        return <li>{str}</li>
                    })}
            </ul>
        </div>
    )
}

export default PastSearches
