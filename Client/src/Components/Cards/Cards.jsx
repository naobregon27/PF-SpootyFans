import Card from "../Card/Card"
import {useSelector} from "react-redux";

const Cards = () => {

    const songs = useSelector((state) => state.songs)

    return (
        <div>
            {songs.map((song) => {
                return (
                    <Card 
                   key = {song.id}
                    id = {song.id}
                        name = {song.name}
                        image = {song.imageUrl}
                        genre = {song.genre}
                        url = {song.url}/>
                )
            })}
        </div>
    )
}

export default Cards;