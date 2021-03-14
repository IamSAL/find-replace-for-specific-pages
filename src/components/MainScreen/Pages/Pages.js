import React, { useEffect } from 'react'
import Page from './Page'
import Loader from './Loader';
import Message from './Message'

const Pages = ({ params }) => {

    const { pages, singlePageTitle, setsinglePageTitle, setshowMetaForm, singlePageSlug, setsinglePageSlug, finalData, setfinalData } = params;
    useEffect(() => {
        console.log('page from will be reset')
        return () => {

        }
    }, [pages])
    function updatePageMetaShower(form, currentElement) {
        var elements = Array.from(form.querySelectorAll('input')).filter(input => input.checked);
        if (elements.length == 1) {
            setshowMetaForm(true)
            setsinglePageTitle(elements[0].getAttribute('data-title'));
            setsinglePageSlug(elements[0].getAttribute('data-slug'));
        } else {
            setshowMetaForm(false)
        }


        let formData = new FormData(form)
        let data = {
            pages: [],
        }
        for (let [key, value] of formData.entries()) {
            data.pages.push({ slug: key, id: value, })
        }
        setfinalData(fdata => Object.assign(fdata, data))
    }
    return (

        <div className="pages">
            <Loader></Loader>
            <Message></Message>
            <form id="pageForm" onChange={(e) => {
                updatePageMetaShower(e.target.parentElement.parentElement.parentElement.parentElement, e.target)
            }}>
                <ul>
                    {pages.map(page => {
                        return <Page params={{ page }}></Page>
                    })}
                </ul>
            </form>


        </div>

    )
}

export default Pages
