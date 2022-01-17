import React, { useState, useEffect, memo } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { receiveMessageReducer, sendMessageReducer } from '../../../store/reducers/contentChat.reducer'
import Button from '@mui/material/Button';
import Charts from './charts';

import "./contentChat.css"

function ContentChat() {
    const { socket }: any = useSelector((state: any) => state.socketReducer)
    let nameTelaInicial = useSelector((state: any) => state.changeDadosTelaInicialReducer.telaInicial.nome)
    const contentChatData: any = useSelector((state: any) => state.openChatReducer)
    console.log("renderizou content chat")
    const dispatch = useDispatch()

    const [typeMessage, setTypeMessage] = useState<string>("")

    useEffect(() => {
        // alert("Cer")
        socket.on("received_message_from_robo", (message: any) => {
            dispatch(receiveMessageReducer(message))
        })

        socket.on("send_message_to_robo_reservatorios_sp", (message: any) => {
            dispatch(receiveMessageReducer(message))
        })

    }, [socket])


    function SendMessage({ message, author, destination, socketDestinatioString }: any) {
        let date = new Date()
        let time = `${date.getHours()}:${date.getMinutes()}`
        dispatch(sendMessageReducer({ message, author, destination, socketDestinatioString }))
        socket.emit(socketDestinatioString, { message, author, time })
        setTypeMessage("")
    }
    return (
        <>
            {contentChatData.map((data: any, index: any) => {
                if (data.openChat) {
                    //o chat que tiver como true o obj "data.openChat", terá a conversa aberta abaixo
                    return (

                        <div>
                            <article className="contentChat-article"  >
                                <div className="contentChat-article-div_nomechat">
                                    <div className="contentChat-article-div-div_nomechat">
                                        <h1 className="contentChat-article-div-h1_nomechat">{data.chatNameDestination}</h1>
                                    </div>
                                </div>
                                <div className="contentChat-article-div_content">
                                    {data.contentChat.map((data: any, index: number) => {//faz um map na array de conversa da janela aberta
                                        return (
                                            <div className={data.author === nameTelaInicial ? "contentChat-article-div-div_content author_myself" : "contentChat-article-div-div_content author_others"}>

                                                <div className="contentChat-article-div-div-div_content"
                                                    style={{ backgroundColor: data.author === nameTelaInicial ? "rgb(147, 235, 229)" : "rgb(227, 251, 122)" }}
                                                >
                                                    <p className="contentChat-article-div-p_content">{data.content}</p>
                                                    <p className="contentChat-article-div-p_author">{data.author}</p>
                                                    <p className="contentChat-article-div-p_time"> {data.time}</p>
                                                    <img className="contentChat-article-div-img_content" src={data?.image} />
                                                    {/* se houver conteudo objeto isChar (dados para os graficos) */}
                                                    <div className="contentChat-article-div-chartS" style={{ backgroundImage: "url(gif_background_login.gif)" }}>
                                                        {data.isCharts &&
                                                            <Charts data={data.isCharts} />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </article>
                            <section className="contentChat-section">
                                <div className="contentChat-section-div">
                                    <div className="contentChat-article-input-div">
                                        <input type="text" className='contentChat-article-input-div-input' value={typeMessage}
                                            onChange={(data: any) => { setTypeMessage(data.target.value) }}
                                        />

                                    </div>
                                    <div className="contentChat-article-botton-div">

                                        <Button variant="contained" size="large"
                                            disabled={typeMessage.length < 1 ? true : false}
                                            style={{ height: "8.5vh", borderRadius: "10px", marginBottom: "5px" }}
                                            onClick={() => {
                                                SendMessage({
                                                    message: typeMessage, author: nameTelaInicial,
                                                    destination: data.chatNameDestination, socketDestinatioString: data.socketDestination
                                                })
                                            }}
                                        >Enviar</Button>
                                    </div>
                                </div>
                            </section>
                        </div>

                    )
                }
            })}

        </>
    )
}

export default memo(ContentChat)

