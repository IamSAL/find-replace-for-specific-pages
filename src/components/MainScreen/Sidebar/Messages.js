import React from 'react'

const Messages = ({ params }) => {
    const { msgs } = params;
    return (

        <div className="messages">
            <ul>
                {
                    msgs && msgs.map(msg => {
                        return <li>{msg}</li>
                    })
                }


            </ul>
        </div>

    )
}

export default Messages
