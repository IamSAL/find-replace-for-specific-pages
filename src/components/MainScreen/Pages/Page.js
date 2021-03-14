import React from 'react'

const page = ({ params }) => {
    const { page } = params;

    return (
        <div>
            <li>
                <input type="checkbox" id={page.id} value={page.id} name={page.slug} data-slug={page.slug} data-title={page.title} />
                <label htmlFor={page.id}> {page.title}</label>
            </li>
        </div>
    )
}

export default page
