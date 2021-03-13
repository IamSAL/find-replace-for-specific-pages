import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Css/style.css';
import Search from './Search/Search';
import Replace from './Replace/Replace';
import MainScreen from './MainScreen/MainScreen';

const FRSP = () => {

    const [searchStr, setsearchStr] = useState('');
    const [replaceStr, setreplaceStr] = useState('');
    const [pastSearches, setpastSearches] = useState([])
    const [loader, setLoader] = useState('Search');
    const [matchedPages, setmatchedPages] = useState([])
    const [showMetaForm, setshowMetaForm] = useState(true)
    const [singlePageTitle, setsinglePageTitle] = useState("title");
    const [singlePageSlug, setsinglePageSlug] = useState("slug")
    const [ReplaceResults, setReplaceResults] = useState([])



    const url = `${appLocalizer.apiUrl}/frsp/v1/settings`;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader('Searching...');
        loadMatchedPages();
        postSearchStr();
    }

    function loadMatchedPages() {
        axios.get(`${appLocalizer.apiUrl}/wp/v2/pages/?per_page=100`, {
            headers: {
                'content-type': 'application/json',
                'X-WP-NONCE': appLocalizer.nonce
            }
        })
            .then((res) => {
                console.log(`${appLocalizer.apiUrl}/wp/v2/pages/?per_page=100`)
                setLoader('Search');
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

                }).filter(page => !!page && isMatchedContent(page))

                setmatchedPages(matched)
            })

    }



    function postSearchStr() {
        axios.post(url, {
            searchStr: searchStr,
        }, {
            headers: {
                'content-type': 'application/json',
                'X-WP-NONCE': appLocalizer.nonce
            }
        })
            .then((res) => {
                setLoader('Search');
                updatePastList();
            })
    }
    function updatePastList() {
        axios.get(url)
            .then((res) => {
                setpastSearches(res.data.searchStr);

            })
    }

    function handleReplace(e) {
        let formData = new FormData(e.target)
        let data = {
            pages: [],
        }
        for (let [key, value] of formData.entries()) {
            if (key == "replaceStr") {
                data[key] = value;
            } else {
                data.pages.push({ slug: key, id: value })
            }
        }
        let toReplace = [];

        data.pages.forEach(page => toReplace.push(replacePageContent(page, data.pages.length == 1)))
        Promise.allSettled(toReplace).then(res => {
            setReplaceResults([...res.map(singleRes => singleRes.reason)])
            resetAll()
        })

        e.preventDefault();
    }
    function resetAll() {
        setsearchStr("")
        setreplaceStr("")
        setsinglePageSlug("")
        setsinglePageTitle("")
        setmatchedPages([])
    }

    function isMatchedContent(page) {
        let content = JSON.parse(JSON.stringify(page.content))
        let currentPageContent = content.rendered;
        return currentPageContent.includes(searchStr);
    }



    function replacePageContent(page, isSingle) {
        return new Promise((resolve, reject) => {
            axios.put(url, {
                searchStr: searchStr,
                replaceStr: replaceStr,
                pageID: page.id,
                single: isSingle,
                pageTitle: singlePageTitle || " ",
                pageSlug: singlePageSlug || page.slug


            }, {
                headers: {
                    'content-type': 'application/json',
                    'X-WP-NONCE': appLocalizer.nonce
                }
            }).then(res => {
                if (res.data == "Nothing to update") {
                    reject(`${page.id}:${page.slug} FAIL(Nothing to update)`)
                } else {
                    resolve(`${page.id}:${page.slug} SUCCESS(${JSON.stringify(res.data)})`)
                }

            }).catch(e => reject(`${page.id}:${page.slug} FAIL(${e.message})`))
        })
    }



    function updatePageMetaShower() {
        let formData = new FormData(document.getElementById('pageForm'))
        let data = {
            pages: [],
        }
        for (let [key, value] of formData.entries()) {
            if (key == "replaceStr") {
                data[key] = value;
            } else {
                data.pages.push({ slug: key, id: value })
            }

        }
        console.log(data.pages.length)
        if (data.pages.length < 2) {
            setshowMetaForm(true);
        } else {
            setshowMetaForm(false);
        }

    }

    useEffect(() => {
        updatePastList();
    }, [])


    return (
        <React.Fragment>

            <div className="finder-wrapper">
                <div className="finder">
                    <div className="top_title">
                        <h3>🔎 Find &amp; Replace For Specific Pages.</h3>
                    </div>
                    <Search params={{ searchStr, setsearchStr }} />
                    <MainScreen />
                    <Replace params={{ replaceStr, setreplaceStr }} />
                </div>
            </div>




            < h2 > Enter a string to find all the pages that contains it:</h2 >
            <form id="work-settings-form" onSubmit={(e) => handleSubmit(e)}>

                <label htmlFor="searchStr">Find: </label>
                <textarea className="regular-text" id="searchStr" onChange={(e) => { setsearchStr(e.target.value); }} value={searchStr}></textarea>
                <button type="submit" className="button ">{loader}</button>

            </form>

            <h4 title="Select the pages you want to replace the search string.">Matched Pages:</h4>

            <form onSubmit={(e) => handleReplace(e)} id="pageForm">
                {
                    matchedPages && matchedPages.map(page => {

                        return <div>
                            <input type="checkbox" id={page.id} name={page.slug} value={page.id} onChange={(e) => {

                                if (showMetaForm) {
                                    setsinglePageTitle(page.title);
                                    setsinglePageSlug(page.slug);
                                    console.log({ singlePageTitle, singlePageSlug })
                                }
                                updatePageMetaShower(e);

                            }} />
                            <label htmlFor={page.id}> {page.title}</label>
                        </div>


                    })
                }
                <label htmlFor="replaceStr">Replace: </label>
                <textarea className="regular-text" name="replaceStr" id="replaceStr" onChange={(e) => { setreplaceStr(e.target.value); }} value={replaceStr}></textarea>
                <button type="submit" className="button ">Replace</button>
            </form>


            {
                showMetaForm && <React.Fragment >
                    <input type="text" placeholder="New Title" onChange={(e) => setsinglePageTitle(e.target.value)} value={singlePageTitle} />
                    <input type="text" placeholder="New Slug" onChange={(e) => setsinglePageSlug(e.target.value)} value={singlePageSlug} />
                </React.Fragment >
            }

            <details style={{ marginTop: "40px" }}>
                <summary>Past Searches:</summary>
                <ul>
                    {


                        pastSearches && pastSearches.map(str => {
                            return <li>{str}</li>
                        })
                    }
                </ul>
            </details>



        </React.Fragment >
    )
}

export default FRSP;