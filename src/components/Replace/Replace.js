import React from 'react'

const Replace = ({ params }) => {
    const { replaceStr, setreplaceStr } = params;
    return (
        <div>
            <div className="replace">
                <div className="inputFieldLarge">
                    <textarea cols={50} rows={2} placeholder="Replace by..." onChange={(e) => { setreplaceStr(e.target.value); }} defaultValue={replaceStr} />
                </div>
                <button>Replace</button>
            </div>
        </div>
    )
}

export default Replace
