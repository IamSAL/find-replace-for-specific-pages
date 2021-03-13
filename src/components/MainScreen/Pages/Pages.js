import React from 'react'
import Page from './Page'
import Loader from './Loader';
import Message from './Message'

const Pages = () => {

    return (

        <div className="pages">
            <Loader></Loader>
            <Message></Message>
            <form className="page-list">
                <ul>
                    {/* {pages.map(page => {
                        <Page page={page}></Page>
                    })} */}
                </ul>
            </form>


        </div>

    )
}

export default Pages
