import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import Page from './Page'
import Loader from './Loader';
import Message from './Message';
import { PageProvider } from '../../../contexts/PageContext'
import { PageContext } from '../../../contexts/PageContext'


const Pages = () => {
    const [pages, setPages] = useContext(PageContext);
    useEffect(() => {

        axios.get(`${appLocalizer.apiUrl}/wp/v2/pages/?per_page=100`, {
            headers: {
                'content-type': 'application/json',
                'X-WP-NONCE': appLocalizer.nonce
            }
        })
            .then((res) => {
                let matched = res.data.map(page => {
                    let matchedP
                    try {
                        matchedP = {
                            id: page.id,
                            title: page.title.rendered,
                            slug: page.slug,
                            link: page.link,
                            content: page.content
                        }

                    } catch (e) {
                        return false;
                    }
                    return matchedP;

                })
                setPages(matched)
                setInterval(() => {
                    setPages(matched)
                    console.log(pages)
                }, 2000)


            })
        return () => {
            setPages([])
        }
    }, [])

    return (

        <div className="pages">
            <Loader></Loader>
            <Message></Message>


            <form className="page-list">
                <ul>
                    {pages.map(page => {
                        <Page page={page}></Page>
                    })}
                </ul>
            </form>


        </div>

    )
}

export default Pages
