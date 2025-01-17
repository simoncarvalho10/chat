import React, {useRef} from "react";
import io from 'socket.io-client'

        export default function Join({setChatVisibility, setSocket}) {

    const usernameRef = useRef()

    const handleSubmit = async () => {
        const username = usernameRef.current.value
        if(!username.trim()) return
        const socket = await io.connect('http://localhost:3001')
        console.log('join username: ', username)
        //envia o username ao server
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)   
    }

    const getEnterKey = (e) => {
        if (e.key ==='Enter')
            handleSubmit() 
    }

    return (
        <div>
            <h1>Join</h1>
            <input type="text" ref={usernameRef} onKeyDown={(e)=>getEnterKey(e)} placeholder="Nome do usuário" />
            <button onClick={()=>handleSubmit()}>Entrar</button>
        </div>
    )
}