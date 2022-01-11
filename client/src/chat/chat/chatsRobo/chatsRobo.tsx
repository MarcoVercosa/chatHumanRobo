import React, { } from 'react'
import "./chatsRobo.css"
import { useDispatch, useSelector } from "react-redux"
import { contentChatReducer } from '../../../store/reducers/contentChat.reducer'




function ChatsRobo() {
    const dispatch = useDispatch()
    const contentChatData: any = useSelector((state: any) => state)


    function OpenChatWindow(chatSelect: string) {

        let temp: any[] = JSON.parse(JSON.stringify(contentChatData.contentChatReducer));
        //Com as props JSON consigo clonar o obj com outra referência, desvinculando totalmente da memoria alocada


        temp.map((data: any, index: number) => {
            if (data.chatNameDestination === chatSelect) {
                data.openChat = true
            } else {
                data.openChat = false
            }
        })
        dispatch(contentChatReducer(temp))
    }

    return (

        <article className='article-janelas_chat'>
            <div className='article-janelas_chat-p'>
                <i className="fas fa-3x fa-robot" style={{ color: "rgb(128, 128, 128)" }}></i>
            </div>

            {contentChatData.contentChatReducer &&
                contentChatData.contentChatReducer.map((data: any, index: any) => {

                    return (
                        <div className='article-div-janelas_chat' key={index} onClick={() => { OpenChatWindow(data.chatNameDestination) }}>
                            <div className='article-div-janelas_chat-avatar'>
                                <div className='article-div-janelas_chat-avatar-image'>
                                    <i className={data.avatar} style={{ color: `${data.color}` }}></i>
                                </div>
                            </div>
                            <div className='article-div-janelas_chat-nome'>
                                <p>{data.chatNameDestination}</p>
                            </div>
                        </div>
                    )
                })
            }



        </article>

    )
}

export default ChatsRobo
