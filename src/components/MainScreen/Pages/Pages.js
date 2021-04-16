import React, { useEffect } from 'react'
import Page from './Page'
import Loader from './Loader';
import Message from './Message'
import SkeletonTypography from './../../Loading';

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

            <Message></Message>
            <form id="pageForm" onChange={(e) => {
                console.log(e.target.parentElement.parentElement.parentElement)
                updatePageMetaShower(e.target.parentElement.parentElement.parentElement, e.target)
            }}>
                <ul>

                    {/* {ShowError ? <div className="NoPage"><h3>No pages found, Try again.</h3></div> : pages.length > 1 ? pages.map(page => <Page params={{ page }}></Page>) : <div><Loader></Loader>{[1, 2, 3, 4, 5, 6, 7].map(p => <SkeletonTypography></SkeletonTypography>)}</div>}
                    {ShowError && <PastSearches />} */}
                    {pages.length > 1 ? pages.map(page => <Page params={{ page }}></Page>) : <div><Loader></Loader>{[1, 2, 3, 4, 5, 6, 7].map(p => <SkeletonTypography></SkeletonTypography>)}</div>}
                </ul>
            </form>


        </div>

    )
}

export default Pages
