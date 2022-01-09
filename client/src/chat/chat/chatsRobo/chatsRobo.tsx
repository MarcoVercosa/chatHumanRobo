import React, { } from 'react'
import "./chatsRobo.css"
import { useDispatch, useSelector } from "react-redux"
import { contentChatReducer } from '../../../store/reducers/contentChat.reducer'




function ChatsRobo() {
    const dispatch = useDispatch()
    const contentChatData: any = useSelector((state: any) => state)


    // function Criar() {

    //     let estadoAtual = []
    //     estadoAtual = contentChatData.contentChatReducer.contentChat
    //     let novoEstado = {
    //         openChat: false,
    //         chatName: "robo_water",
    //         ID: 1,
    //         contentChat: [{
    //             content: "",
    //             author: "",
    //             time: ""
    //         }]
    //     }

    //     let temp = [...estadoAtual, novoEstado]

    //     dispatch(contentChatReducer(temp))
    //     // // console.log(contentChatData.contentChatReducer)
    // }

    function OpenChatWindow(chatSelect: string) {

        let temp: any[] = JSON.parse(JSON.stringify(contentChatData.contentChatReducer.contentChat));
        //Com as props JSON consigo clonar o obj com outra referência, desvinculando totalmente da memoria alocada

        temp.map((data: any, index: number) => {
            if (data.chatName === chatSelect) {
                data.openChat = true
            } else {
                data.openChat = false
            }
        })
        console.log(temp)
        dispatch(contentChatReducer(temp))
    }

    return (

        <article className='article-janelas_chat'>
            <div className='article-janelas_chat-p'>
                <i className="fas fa-3x fa-robot" style={{ color: "rgb(128, 128, 128)" }}></i>
            </div>

            {contentChatData.contentChatReducer.contentChat &&
                contentChatData.contentChatReducer.contentChat.map((data: any, index: any) => {

                    return (
                        <div className='article-div-janelas_chat' key={index} onClick={() => { OpenChatWindow(data.chatName) }}>
                            <div className='article-div-janelas_chat-avatar'>
                                <div className='article-div-janelas_chat-avatar-image'>
                                    <i className={data.avatar} style={{ color: `${data.color}` }}></i>
                                </div>
                            </div>
                            <div className='article-div-janelas_chat-nome'>
                                <p>{data.chatName}</p>
                            </div>
                        </div>
                    )
                })
            }



        </article>

    )
}

export default ChatsRobo
