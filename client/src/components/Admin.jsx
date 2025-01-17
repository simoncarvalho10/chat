import React, {useRef, useState, useEffect} from "react";
import io from 'socket.io-client'

import { GoPaperAirplane } from "react-icons/go";

export default function Chat({}) {
    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])
	const [typeList, setTypeList] = useState([])											
    const socket = useRef(null);
	const ws = new WebSocket("http://localhost:3002");	
    
    
	
	useEffect (() => {
        socket.current = io.connect("http://localhost:3001");
        //setTypeList([]);
        
        socket.current.on ('receive_message', data => {

            if (data.username != "Admin") {
                //alert("username: "+data.username)
                setTypeList([]); 
            }


            setMessageList((current) => [...current, data])
        })

        return () => {
            socket.current.off('receive_message')
        };
    })

    ws.onmessage = (event) => {
        const response = JSON.parse(event.data); 

        if (response.event === 'typing_message') {
            const vUsername = response.data?.username;
            if (vUsername != "Admin"){
                setTypeList(() => [response.data])
            }
        } 
    } 

    useEffect(() => {
        if (typeList.some(message => message.count === 0)) {
            setTypeList([]);
        }
    }, [typeList]);												
							
	/*useEffect(() => {
        setTypeList([]);
    }, [messageList]);  */														 

    const sendToServer = () => {
        const message = messageRef.current.value

        const data = {
            username: 'Admin',
            message: message
        }
        
        ws.send(JSON.stringify(data));
    }													  

    const handleSubmit = () => {
        
        const message = messageRef.current.value
        const username = 'Admin'
        
        if (!message.trim()) return; 
        socket.current.emit('message', {
            username, 
            message
        });
        scrollToEnd();
        clearInput();
        
    }
   
    function scrollToEnd() {
        const vTopPage = document.getElementById("startpage")

        vTopPage.scrollTo({
          top: vTopPage.scrollHeight,
          behavior: 'smooth'
        });
      }

    const getEnterKey = (e) => {
        if (e.key ==='Enter')
            handleSubmit() 
    }    
    
    const clearInput = () => {
        messageRef.current.value = ''
    }
	
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0'); 
    const nomesMeses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const mes = nomesMeses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();
    
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const horaAtual = `${horas}:${minutos}`;
    
    const fullDate = `${mes} ${dia}, ${ano}, ${horaAtual}`
    
    console.log('Data e hora: ',fullDate) 	

    return (
        <div className='flex flex-col w-full h-screen'>
            <div className="w-full bg-gray-100 border-b-2 border-gray-300">
                <div className="flex items-center font-bold text-[20px] px-4 my-6">
                    <p>Atendimento</p>
                </div>
            </div>
            <div id="startpage" className="p-4 flex flex-col grow w-full gap-4 overflow-y-auto">

            {
                    messageList.map((message, index) => {
                    const isUserRetorn = message.username === "Admin";                   
                    return(
	 
                        <div className={`${isUserRetorn ? "flex justify-end" : "flex justify-start"}`}>
                            <div className="max-w-[80%] flex flex-col gap-1">
                                <p 
                                    key={index}
                                    className={`p-4 shadow-md overflow-hidden break-words ${isUserRetorn ? "text-right  bg-blue-300 rounded-l-3xl rounded-tr-3xl" : "text-left  bg-gray-300 rounded-r-3xl rounded-tl-3xl"} inline-block`}
                                >
                                    {message.message}
                                </p>
                                <p 
                                    key={index}
                                    className={`${isUserRetorn ? "text-right" : "text-left"} text-sm text-gray-700`}
                                >
                                    {fullDate}
                                </p>                                        
                            </div>
                        </div>	
                    )
                })
            } 

{
                typeList.map((message, index) =>{
                    const isUserRetorn = message.username === "Admin";

                    return (
                        <div className={`${isUserRetorn ? "flex justify-end" : "flex justify-start"}`}>
                            <div  className="max-w-[80%] flex flex-col gap-1">
                                <p 
                                    key={index}
                                    className={`p-4 shadow-md overflow-hidden break-words ${isUserRetorn ? "text-right  bg-blue-300 rounded-l-3xl rounded-tr-3xl" : "text-left  bg-gray-300 rounded-r-3xl rounded-tl-3xl"} inline-block`}
                                > 
                                    <div class="flex p-2 items-center justify-end space-x-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-bounce animation-delay-1s"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-bounce animation-delay-2s"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-bounce animation-delay-3s"></span>
                                    </div>

                                </p>
                                <p 
                                    key={index}
                                    className={`${!isUserRetorn} ? "text-right" : "text-left"} text-sm text-gray-700`}
                                >
                                    {fullDate}
                                </p>                                        
                            </div>
                        </div>	
                    )

                })
            }

            </div>
            <div className="w-full bg-gray-200 border-t-2 border-gray-300">
                <div className="flex px-4 my-5 gap-3">
                    <input type="text" onChange={sendToServer} ref={messageRef} onKeyDown={(e)=>getEnterKey(e)} placeholder="Digite a sua mensagem..." className="bg-gray-200 border border-blue-500 p-2 rounded-full grow" />
                    <button onClick={handleSubmit} className="w-[70px] text-blue-500 flex justify-center items-center"><GoPaperAirplane size={40} /></button>
                </div>
            </div>
        </div>
        
    )

}