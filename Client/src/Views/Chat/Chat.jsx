import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { LiMensaje, UlMensajes } from "./plantillachat.jsx";
// const socket = io("http://localhost:3002");
const socket = io("https://spootyfans.onrender.com");

import { IconSend } from "@tabler/icons-react";

function Chat() {
   const [isConnected, setIsConnected] = useState(false);
   const [nuevoMensaje, setNuevoMensaje] = useState("");
   const [mensajes, setMensajes] = useState([]);

   useEffect(() => {
      socket.on("connect", () => setIsConnected(true));

      socket.on("chat_message", (data) => {
         setMensajes((mensajes) => [...mensajes, data]);
      });

      return () => {
         socket.off("connect");
         socket.off("chat_message");
      };
   }, []);

   const enviarMensaje = () => {
      socket.emit("chat_message", {
         // usuario: socket.id,
         mensaje: nuevoMensaje,
      });
   };

   return (
      <div className="font-custom w-full h-[32rem] mt-[-3rem] max-md:mt-10 max-md:mb-5">
         {isConnected ? (
            <div className="flex flex-row justify-center">
               <p>online&nbsp;</p>
               <span className=" rounded-full w-[1rem] h-[1rem] bg-green-600">&nbsp;</span>
            </div>
         ) : (
            <div className="flex justify-center overflow-hidden">
               <p>offline&nbsp;</p>
               <span className=" rounded-full w-[1rem] h-[1rem] bg-red-600">&nbsp;</span>
            </div>
         )}

         <div className="h-full overflow-x-hidden overflow-y-scroll border border-[#ffffff20] m-1 rounded-l-[1rem] bg-[#ffffff10] backdrop-blur-[10px]">
            <UlMensajes>
               {mensajes.map((mensaje) => (
                  <LiMensaje>
                     {" "}
                     {mensaje.usuario} {mensaje.mensaje}
                  </LiMensaje>
               ))}
            </UlMensajes>
         </div>

         <div
            className=" border border-[#ffffff30] flex flex-row justify-center items-center rounded-[5rem] backdrop-blur-3xl"
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}>

            <input className="bg-transparent w-full pl-3 outline-none"/>

            <button className="p-[.4rem]" onClick={enviarMensaje}>
               <IconSend size={25}/>
            </button>
         </div>
      </div>
   );
}

export default Chat;
