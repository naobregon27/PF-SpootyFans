import { io } from "socket.io-client"
import { useState, useEffect } from "react"
import { LiMensaje, UlMensajes } from "./plantillachat.jsx";
import style from "./chat.module.css";
const socket = io('http://localhost:3002');
import {IconSend} from "@tabler/icons-react";

function Chat() {

  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {

    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMensajes(mensajes => [...mensajes, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    }

  }, []);

  const enviarMensaje = () => {
    socket.emit('chat_message', {
      // usuario: socket.id,
      mensaje: nuevoMensaje
    });
  }

  return (
    <div className="font-custom">
      <h2 className="pl-20">{isConnected ? "online..." : "offline"}</h2>
      <div className={style.mensaje}>
        <UlMensajes>
          {mensajes.map(mensaje => (
            <LiMensaje> {mensaje.usuario} {mensaje.mensaje}</LiMensaje>
          ))}
        </UlMensajes>
      </div>

      <div className= "shadow-inner shadow-white backdrop-blur-[5px] flex flex-row border h-[2.5rem] bg-transparent rounded-[5rem] focus:bg-[#ffffff20]" type="text" value={nuevoMensaje} onChange={e => setNuevoMensaje(e.target.value)} >
        <input className={style.input}/>
        <button className="pl-1 outline-none"onClick={enviarMensaje}><IconSend size={30}/></button>
      </div>
  
      <div>
      
      </div>
    </div>
  );
}

export default Chat;