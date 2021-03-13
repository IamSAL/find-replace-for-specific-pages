import React from 'react'

const Search = ({ params }) => {
    const { searchStr, setsearchStr } = params;
    return (
        <div>
            <div className="search">
                <div className="inputFieldLarge">
                    <textarea cols={50} rows={2} placeholder="Search for..." onChange={(e) => { setsearchStr(e.target.value) }} defaultValue={searchStr} />
                </div>
                <button>Search</button>
            </div>
        </div>
    )
}

export default Search
