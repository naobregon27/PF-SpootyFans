import styled from "styled-components";

const UlMensajes = styled.ul`
   margin: 10px auto;
   list-style: none;
   display: flex;
   flex-direction: column;
`;

const LiMensaje = styled.li`
   background-color: #ffffff30;
   border: solid 1px #ffffff50;
   box-shadow: 0px 15px 60px 0px rgba(0,0,0,1);
   padding: 0.3rem 0.8rem;
   border-radius: 2rem;
   margin: 0.1rem .5rem;
   color: white;
`;

export { UlMensajes, LiMensaje };
