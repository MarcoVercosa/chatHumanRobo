import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { contentChatReducer } from '../../../store/reducers/contentChat.reducer'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "./contentChat.css"

function ContentChat() {

    let nameTelaInicial = useSelector((state: any) => state.changeDadosTelaInicialReducer.telaInicial.nome)
    const [typeMessage, setTypeMessage] = useState<string>("")
    const dispatch = useDispatch()

    const { socket }: any = useSelector((state: any) => state.socketReducer)
    const contentChatData: any = useSelector((state: any) => state.contentChatReducer)

    socket.once("received_message_from_robo", (message: any) => {
        let temp = JSON.parse(JSON.stringify(contentChatData))
        temp.map((data: any, index: any) => {
            if (message.author === data.chatNameDestination) {
                data.contentChat = [...data.contentChat, message]
            }
        })
        dispatch(contentChatReducer(temp))
    })

    function SendMessage({ message, author, destination }: any) {
        if (typeMessage.length > 0) {
            let date = new Date()
            let time = `${date.getHours()}:${date.getMinutes()}`

            let temp = JSON.parse(JSON.stringify(contentChatData))
            temp.map((data: any, index: number) => {
                if (destination === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, { content: message, author, time }]
                }
            })
            dispatch(contentChatReducer(temp))
            socket.emit("send_message_to_robo_imc", { message, author, time })
            setTypeMessage("")
        } else {
            alert("Digite algo para enviar")
        }
    }

    console.log("Renderizou")
    return (
        <>
            {contentChatData.map((data: any, index: any) => {
                if (data.openChat) {
                    //o chat que tiver como true o obj "data.openChat", terá a conversa aberta abaixo
                    return (
                        <>
                            <div
                            // style={{ height: "100vh" }}
                            >
                                <article className="contentChat-article">
                                    <div className="contentChat-article-div_nomechat">
                                        <div className="contentChat-article-div-div_nomechat">
                                            <h1 className="contentChat-article-div-h1_nomechat">{data.chatNameDestination}</h1>
                                        </div>
                                    </div>
                                    <div className="contentChat-article-div_content">
                                        {data.contentChat.map((data: any, index: number) => {
                                            return (
                                                <div className={data.author === nameTelaInicial ? "contentChat-article-div-div_content author_myself" : "contentChat-article-div-div_content author_others"}>

                                                    <div className="contentChat-article-div-div-div_content"
                                                        style={{ backgroundColor: data.author === nameTelaInicial ? "rgb(147, 235, 229)" : "rgb(227, 251, 122)" }}
                                                    >
                                                        <p className="contentChat-article-div-p_content">{data.content}</p>
                                                        <p className="contentChat-article-div-p_author">{data.author}</p>
                                                        <p className="contentChat-article-div-p_time"> {data.time}</p>
                                                        <img className="contentChat-article-div-img_content" src={data?.image} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </article>
                                <section className="contentChat-section">
                                    <div className="contentChat-section-div">
                                        <div className="contentChat-article-input-div">
                                            {/* <TextField id="outlined-basic" label="Mensagem..." variant="outlined" name="message"
                                                style={{
                                                    width: "100%", height: "8.5vh"
                                                }}
                                                onChange={(data: any) => { setTypeMessage(data.target.value) }}
                                            /> */}
                                            <input type="text" className='contentChat-article-input-div-input'
                                                onChange={(data: any) => { setTypeMessage(data.target.value) }}
                                            />

                                        </div>
                                        <div className="contentChat-article-botton-div">

                                            <Button variant="contained" size="large"
                                                style={{ height: "8.5vh", borderRadius: "10px", marginBottom: "5px" }}
                                                onClick={() => { SendMessage({ message: typeMessage, author: nameTelaInicial, destination: data.chatNameDestination }) }}
                                            >Enviar</Button>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </>
                    )
                }
            })}

        </>
    )
}

export default memo(ContentChat)

