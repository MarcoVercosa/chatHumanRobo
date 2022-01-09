import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { contentChatReducer } from '../../../store/reducers/contentChat.reducer'


function ContentChat() {
    const dispatch = useDispatch()
    const contentChatData: any = useSelector((state: any) => state)

    return (
        <div>

            {contentChatData.contentChatReducer.contentChat.map((data: any, index: any) => {
                if (data.openChat) {
                    return (
                        <h1>{data.chatName}</h1>
                    )
                }
            })}

        </div>
    )
}

export default ContentChat

