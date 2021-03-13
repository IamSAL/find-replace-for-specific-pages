import React from 'react'

const page = ({ page }) => {
    return (
        <div>
            <li>
                <input type="checkbox" name="page" id="page" />
                <label htmlFor="page">{page.name}</label>
            </li>
        </div>
    )
}

export default page
