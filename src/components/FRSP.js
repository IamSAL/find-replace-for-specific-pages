import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import '../Style/Css/style.css';
import Search from './Search/Search';
import Replace from './Replace/Replace';
import MainScreen from './MainScreen/MainScreen';

export const FRSPcontext = createContext();
export const FRSP = () => {

    const [searchStr, setsearchStr] = useState('');
    const [replaceStr, setreplaceStr] = useState('');
    const [pastSearches, setpastSearches] = useState([])
    const [loader, setLoader] = useState('Search');
    const [showMetaForm, setshowMetaForm] = useState(true)
    const [singlePageTitle, setsinglePageTitle] = useState("");
    const [singlePageSlug, setsinglePageSlug] = useState("")
    const [pages, setpages] = useState([])
    const [AllPages, setAllPages] = useState([])
    const [finalData, setfinalData] = useState({ pages: [], replaceStr: "" })
    const [Messages, setMessages] = useState([` ⛔ Please backup your database first, I'm not responsible for data loss!`])

    const url = `${appLocalizer.apiUrl}/frsp/v1/settings`;
    console.log(url)
    function setTempMessage(msg) {
        setMessages(msgs => [...msgs, msg])
        // setTimeout(() => {
        //     setTimeout(() => {
        //         setMessages([` ⛔ Please backup your database first, I'm not responsible for data loss!`])
        //     }, 3000)

        // }, 3000)
    }

    function updatePageList() {
        axios.get(appLocalizer.apiUrl + `/wp/v2/pages/?per_page=100`, {
            headers: {
                'content-type': 'application/json',
                'X-WP-NONCE': appLocalizer.nonce
            }
        })
            .then((res) => {

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

                })
                console.log(res)
                console.log(matched)
                setpages(matched)
                setAllPages(matched)
            })

    }

    useEffect(() => {
        updatePageList();
        axios.get(url)
            .then((res) => {
                console.log(url)
                setLoader('Search');
                axios.get(url)
                    .then((res) => {
                        setpastSearches(res.data.searchStr);
                    })
            })

        return () => {

        }
    }, [])


    useEffect(() => {
        if (searchStr.length > 1) {
            setpages(pages => AllPages.filter(page => !!page && isMatchedContent(page)))
        } else {
            setpages(AllPages)
        }
        return () => {

        }
    }, [searchStr])




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
                axios.get(url)
                    .then((res) => {
                        setpastSearches(res.data.searchStr);

                    })
            })
    }

    function handleReplace(e) {
        console.log(searchStr.length, replaceStr.length)
        if (finalData.pages.length == 0 || searchStr.length == 0 || replaceStr.length == 0) {
            if (finalData.pages.length == 0) {
                console.log(finalData)
                setTempMessage(`⛔ err! No page selected.`)
            }

            if (searchStr.length == 0) {
                console.log("search str error")
                setTempMessage(`⛔ err! No search value.`)
            }
            if (replaceStr.length == 0) {
                console.log("replce str error")
                setTempMessage(`⛔ err! No replace value.`)
            }
            return 0;
        } else {
            const toReplace = [];
            finalData.pages.forEach(page => toReplace.push(replacePageContent(page, finalData.pages.length == 1)))
            Promise.allSettled(toReplace).then(res => {
                res.forEach(singleRes => {
                    console.log(singleRes)
                    if (singleRes.status == "fulfilled") {
                        setTempMessage("☑️ " + singleRes.value);
                    } else if (singleRes.status == "rejected") {
                        setTempMessage("⛔ " + singleRes.reason);
                    }

                });
                resetAll()

            })
            postSearchStr()
            e.preventDefault();
        }

    }

    function resetAll() {
        document.forms.pageForm.reset()
        setsearchStr("")
        setreplaceStr("")
        setsinglePageSlug("")
        setsinglePageTitle("")
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

            }).catch(e => reject(`${page.id}:${page.slug} FAIL(${e})`))
        })
    }

    return (
        <React.Fragment>
            <FRSPcontext.Provider value={{ searchStr, setsearchStr, replaceStr, setreplaceStr, setTempMessage, pastSearches }}>
                <div className="finder-wrapper">
                    <div className="finder">
                        <div className="top_title">
                            <h3>🔎 Find &amp; Replace For Specific Pages.</h3>
                        </div>
                        <Search params={{ searchStr, setsearchStr }} />
                        <MainScreen params={{ pages, singlePageTitle, setsinglePageTitle, showMetaForm, setshowMetaForm, singlePageSlug, setsinglePageSlug, setfinalData, pastSearches, Messages }} />
                        <Replace params={{ replaceStr, setreplaceStr, handleReplace, setfinalData, postSearchStr }} />
                    </div>
                </div>
            </FRSPcontext.Provider>
        </React.Fragment >
    )
}

