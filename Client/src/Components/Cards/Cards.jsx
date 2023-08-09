import Card from "../Card/Card"


const Cards = ({ songs }) => {

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