import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { sendMessageRoboReducer, sendMessagePrivateReducer, sendMessageRoomReducer } from '../../store/reducers/contentChat.reducer'
import Button from '@mui/material/Button';
import Charts from './charts/charts';

import "./contentChat.css"

function ContentChat(): JSX.Element {
    console.log("Carregou content chat")
    const { socket }: any = useSelector((state: any) => state.socketReducer)
    let nameTelaInicial: string = useSelector((state: any) => state.changeDadosTelaInicialReducer.name)
    const contentChatData: Array<{}> = useSelector((state: any) => state.activeWindowChat)
    const dispatch = useDispatch()

    const [typeMessage, setTypeMessage] = useState<string>("")

    function SendMessage({ message, author, destination, socketDestinatioString, chatID, isRobo, isRoom, isPrivate }: any) {
        let date = new Date()
        let time = `${date.getHours()}:${date.getMinutes()}`

        // oq for true, será o tipo de conversa que quer mandar mensagem
        if (isRobo) {
            dispatch(sendMessageRoboReducer({ message, author, destination, socketDestinatioString, time }))

        }
        if (isPrivate) {
            dispatch(sendMessagePrivateReducer({ message, author, chatID }))
        }
        if (isRoom) {
            dispatch(sendMessageRoomReducer({ message, author, destination, chatID }))
        }
        //todo evento de botão irá passar socketDestinatioString, que é o socket destino do servidor q será chamado
        socket.emit(socketDestinatioString, { message, author, time, chatID, destination })
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
                                    <div className="contentChat-article-div-div_idChatRom">
                                        <span
                                        >{`ID: ${data.chatID}`}</span>
                                    </div>

                                </div>
                                <div className="contentChat-article-div_content">
                                    {data.contentChat.map((data: any, index: number) => {
                                        //faz um map na array de conversa da janela aberta
                                        return (
                                            <div className={data.author === nameTelaInicial ? "contentChat-article-div-div_content author_myself" : "contentChat-article-div-div_content author_others"}>

                                                <div className="contentChat-article-div-div-div_content"
                                                    style={{ backgroundColor: data.author === nameTelaInicial ? "rgb(128, 247, 30)" : "rgb(227, 251, 122)" }}
                                                >
                                                    <p className="contentChat-article-div-p_content">{data.content}</p>
                                                    <p className="contentChat-article-div-p_author">{data.author}</p>
                                                    <p className="contentChat-article-div-p_time"> {data.time}</p>
                                                    <img className="contentChat-article-div-img_content" src={data?.image} />

                                                    <div className="contentChat-article-div-charts" style={{ backgroundImage: "url(gif_background_login.gif)" }}>
                                                        {data.isCharts &&
                                                            // se houver no conteudo do server o objeto isChart (dados para os graficos)
                                                            <Charts data={data.isCharts} />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </article>
                            {/* input da mensagem  */}
                            <section className="contentChat-section">
                                <div className="contentChat-section-div">
                                    <div className="contentChat-article-input-div">
                                        <input type="text" className='contentChat-article-input-div-input' value={typeMessage}
                                            onChange={(data: any) => { setTypeMessage(data.target.value) }}
                                            onKeyPress={(event: any) => {
                                                if (typeMessage.length < 1) { return }
                                                event.key === "Enter" &&
                                                    SendMessage({
                                                        message: typeMessage, author: nameTelaInicial, isRobo: data.isRobo, isRoom: data.isRoom, isPrivate: data.isPrivate,
                                                        destination: data.chatNameDestination, socketDestinatioString: data.socketDestination, chatID: data.chatID
                                                    })
                                            }}
                                        />

                                    </div>
                                    {/* botao de enviar */}
                                    <div className="contentChat-article-botton-div">
                                        <Button variant="contained" size="large"
                                            disabled={typeMessage.length < 1 ? true : false}
                                            style={{ height: "7.5vh", borderRadius: "10px", marginBottom: "5px" }}
                                            onClick={() => {
                                                SendMessage({
                                                    message: typeMessage, author: nameTelaInicial, isRobo: data.isRobo, isRoom: data.isRoom, isPrivate: data.isPrivate,
                                                    destination: data.chatNameDestination, socketDestinatioString: data.socketDestination, chatID: data.chatID
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

