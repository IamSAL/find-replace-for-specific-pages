import React from 'react'

const Replace = ({ params }) => {
    const { replaceStr, setreplaceStr, setfinalData, handleReplace, postSearchStr } = params;
    return (
        <div>
            <div className="replace">
                <div className="inputFieldLarge">
                    <textarea cols={50} name="replaceStr" rows={2} placeholder="Replace by..." onChange={(e) => { setreplaceStr(e.target.value); }} value={replaceStr} />
                </div>
                <button onClick={(e) => {
                    setfinalData(fdata => Object.assign(fdata, { replaceStr: replaceStr }));
                    handleReplace(e);
                }}>Replace</button>
            </div>
        </div>
    )
}

export default Replace
