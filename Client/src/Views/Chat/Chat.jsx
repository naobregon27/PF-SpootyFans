import { io } from "socket.io-client"
import { useState, useEffect } from "react"
import { LiMensaje, UlMensajes } from "./plantillachat.jsx";
import style from "./chat.module.css";
const socket = io('http://localhost:3002');

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
    <div >
      <h2>{isConnected ? "CONECTADO" : "NO CONECTADO"}</h2>
      <div className={style.mensaje}>
        <UlMensajes>
          {mensajes.map(mensaje => (
            <LiMensaje> {mensaje.usuario} {mensaje.mensaje}</LiMensaje>
          ))}
        </UlMensajes>
      </div>

      <div >
        <input className={style.input} type="text" value={nuevoMensaje} onChange={e => setNuevoMensaje(e.target.value)} />
      </div>
  
      
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

export default Chat;