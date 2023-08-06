import Card from "../Card/Card"
import {useSelector} from "react-redux";

const Cards = ({ songs }) => {

    const filter = useSelector((state) => state.songFiltered)

    return (
        <div>
            {filter.length? 
            <Card key = {filter[0].id}
                id = {filter[0].id}
                name = {filter[0].name}
                image = {filter[0].imageUrl}
                genre = {filter[0].genre}
                url = {filter[0].url}/>

            :songs.map((song) => {
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