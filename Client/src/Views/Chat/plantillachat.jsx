import styled from 'styled-components';

const UlMensajes = styled.ul`
    max-width: 800px;
    margin: 10px auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const LiMensaje = styled.li`
    background-color: #00000080;
    padding: .5rem .8rem;
    border-radius: 2rem;
    margin: .5rem;
    color: white;
`

export {
    UlMensajes, LiMensaje
}